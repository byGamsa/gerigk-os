/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Supabase project URL and publishable key (guestbook) – in .env.local
  readonly VITE_SUPABASE_URL?: string;
  readonly VITE_SUPABASE_PUBLISHABLE_KEY?: string;
}

// Build timestamp (ISO), set in vite.config.ts
declare const __APP_BUILD__: string;
// Version from package.json
declare const __APP_VERSION__: string;

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
