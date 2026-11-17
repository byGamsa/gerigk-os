-- Wallpapers: public bucket for the self-hosted desktop backgrounds (filled by `npm run wallpapers:sync`).
-- Public buckets serve files via /storage/v1/object/public/… without any policy; uploads only with the secret key.
-- No select policy on storage.objects on purpose, so anonymous clients can't list the bucket.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('wallpapers', 'wallpapers', true, 5242880, array['image/avif', 'image/webp'])
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;
