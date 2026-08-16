/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Unsplash access key (https://unsplash.com/oauth/applications) – in .env.local
  readonly VITE_UNSPLASH_ACCESS_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
