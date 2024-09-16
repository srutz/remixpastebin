interface ImportMetaEnv {
    readonly DBFILE?: string,
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}

// build system
declare const __BUILD_TIME__: string
declare const __BUILD_VERSION__: string
declare const __BUILD_REVISION__: string
