/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Unsplash access key (https://unsplash.com/oauth/applications) – in .env.local
  readonly VITE_UNSPLASH_ACCESS_KEY?: string;
}

// Build timestamp (ISO), set in vite.config.ts
declare const __APP_BUILD__: string;
// Version from package.json
declare const __APP_VERSION__: string;

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
