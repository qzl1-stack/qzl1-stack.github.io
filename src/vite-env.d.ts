/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** 仓库，格式 owner/repo，来自 https://giscus.app 配置 */
  readonly VITE_GISCUS_REPO?: string
  readonly VITE_GISCUS_REPO_ID?: string
  readonly VITE_GISCUS_CATEGORY?: string
  readonly VITE_GISCUS_CATEGORY_ID?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
