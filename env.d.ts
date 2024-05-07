/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_BASE_URL: string,
    readonly VITE_X_API_KEY: string
    // mais variáveis de ambiente...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
