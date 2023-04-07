import Vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vitest/config'

/* Icons */
import { dirname, resolve } from 'pathe'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import Icons from 'unplugin-icons/vite'


// https://vitejs.dev/config/
export default defineConfig({
  test: {
    environment: 'happy-dom',
    globals: true,
  },
  resolve: {
    dedupe: ["vue"],
    alias: {
      '~icons': resolve(dirname('./'), './src/assets/icons'),
      '~': resolve(dirname('./'), './'),
      '@': resolve(dirname('./'), 'src'),
      '@demo/ui': resolve(dirname('./'), 'src'),
    },
  },
  build: {
    lib: {
      entry: resolve(dirname('./'), 'src'),
      formats: ['es'],
      fileName: (format) => {
        switch (format) {
          case 'es':
            return 'demo-ui.mjs'
          default:
            return 'demo-ui.js'
        }
      }
    },
    rollupOptions: {
      external: ['vue', '@vueuse/core', 'gsap', 'split-type'],
      output: {
        exports: 'named',
      }
    },
    assetsInlineLimit: 0,
    reportCompressedSize: true,
  },
  plugins: [
    Vue(),
    AutoImport({
      imports: ['vue', '@vueuse/core'],
      dts: './src/auto-imports.d.ts',
      dirs: ['./src/composables'],
      vueTemplate: true,
    }),
    Components({
      dts: './src/components-imports.d.ts',
    }),
    Icons({
      compiler: 'vue3',
      customCollections: {
        icons: FileSystemIconLoader('./src/assets/icons'),
      },
    }),
  ],
  optimizeDeps: {
    include: ["vue", '@vueuse/core', "gsap", "split-type"]
  }
})
