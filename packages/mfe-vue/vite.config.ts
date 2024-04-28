import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import { transformHtmlPlugin } from './plugins/vite-html-transform'
import vue from '@vitejs/plugin-vue'

export default ({ mode }: { mode: any }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  return defineConfig({
    plugins: [
      vue(),
      transformHtmlPlugin([
        {
          replace: './favicon.ico',
          value: `${process.env.VITE_CDN_URL}/mfe/vue/favicon.ico`
        },
        {
          replace: './assets/index.js',
          value: `${process.env.VITE_CDN_URL}/mfe/vue/assets/index.js`
        },
        {
          replace: './assets/index.css',
          value: `${process.env.VITE_CDN_URL}/mfe/vue/assets/index.css`
        },
        { replace: '<%- title %>', value: 'Vue MFE demo' }
      ])
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    build: {
      rollupOptions: {
        output: {
          entryFileNames: `assets/[name].js`,
          chunkFileNames: `assets/[name].js`,
          assetFileNames: `assets/[name].[ext]`
        }
      }
    },
    base: ''
  })
}
