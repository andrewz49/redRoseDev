import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  base: './', // 相对路径，适用于静态文件服务器
  build: {
    outDir: 'dist',
  },
  plugins: [vue()],
})
