-- Guestbook: visitors anonymously leave text files in a desktop folder.
-- Entries are only inserted by the `guestbook-submit` edge function (service role, after moderation).

create table if not exists public.guestbook_entries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  title text not null check (char_length(title) between 1 and 60),
  body text not null check (char_length(body) between 1 and 1000),
  lang text not null default 'de' check (lang in ('de', 'en')),
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  moderation_reason text,
  -- SHA-256 of IP + secret salt, only for rate limiting
  ip_hash text
);

create index if not exists guestbook_entries_status_created_idx on public.guestbook_entries (status, created_at desc);
create index if not exists guestbook_entries_ip_created_idx on public.guestbook_entries (ip_hash, created_at desc);

alter table public.guestbook_entries enable row level security;

-- The only admin: the site owner (magic link login proves the email)
create or replace function public.is_guestbook_admin()
returns boolean
language sql
stable
set search_path = ''
as $$
  select coalesce(auth.jwt() ->> 'email', '') = 'larsgerigk@gmx.de'
$$;

-- Column privileges: visitors never see status internals or the IP hash
revoke all on public.guestbook_entries from anon, authenticated;
grant select (id, created_at, title, body) on public.guestbook_entries to anon;
grant select (id, created_at, title, body, lang, status, moderation_reason) on public.guestbook_entries to authenticated;
grant update (status) on public.guestbook_entries to authenticated;
grant delete on public.guestbook_entries to authenticated;

drop policy if exists "guestbook: read approved" on public.guestbook_entries;
create policy "guestbook: read approved"
  on public.guestbook_entries for select
  to anon, authenticated
  using (status = 'approved');

drop policy if exists "guestbook: admin reads all" on public.guestbook_entries;
create policy "guestbook: admin reads all"
  on public.guestbook_entries for select
  to authenticated
  using (public.is_guestbook_admin());

drop policy if exists "guestbook: admin moderates" on public.guestbook_entries;
create policy "guestbook: admin moderates"
  on public.guestbook_entries for update
  to authenticated
  using (public.is_guestbook_admin())
  with check (public.is_guestbook_admin());

drop policy if exists "guestbook: admin deletes" on public.guestbook_entries;
create policy "guestbook: admin deletes"
  on public.guestbook_entries for delete
  to authenticated
  using (public.is_guestbook_admin());
