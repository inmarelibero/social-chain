import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import fs from 'fs';
import path from 'path';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ["legacy-js-api"],
      },
    },
  },
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'localhost-key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, 'localhost.pem')),
    },
    // Make sure the server is accessible over the local network
    host: '0.0.0.0',
    proxy: {
      '/rpc': {
        target: 'http://localhost:26657',
        changeOrigin: false,
        rewrite: path => path.replace(/^\/rpc/, ''),
      },
      '/api': {
        target: 'http://localhost:1317',
        changeOrigin: false,
        rewrite: path => path.replace(/^\/api/, ''),
      },
      // '/rpc': {
      //   target: 'http://0.0.0.0:26657',
      //   changeOrigin: true,
      //   rewrite: path => path.replace(/^\/rpc/, ''),
      // },
      // '/api': {
      //   target: 'http://0.0.0.0:1317',
      //   changeOrigin: true,
      //   rewrite: path => path.replace(/^\/api/, ''),
      // },
    },
  },
})
