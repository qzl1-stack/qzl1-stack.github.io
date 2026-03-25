import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// GitHub Pages：用户站 <user>.github.io 用 base: '/'
// 项目站 https://<user>.github.io/<repo>/ 在 CI 里设置 VITE_BASE_PATH=/<repo>/
const base = process.env.VITE_BASE_PATH ?? '/'

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [vue()],
})
