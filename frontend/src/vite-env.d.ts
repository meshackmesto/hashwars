/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_HEDERA_NETWORK: string;
  // add more environment variables if needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
