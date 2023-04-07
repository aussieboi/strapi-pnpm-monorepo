import { defineConfig } from 'histoire'
import { HstVue } from '@histoire/plugin-vue'

export default defineConfig({
  /* Histoire configuration */
  setupFile: 'histoire.setup.ts',
  plugins: [HstVue()],
  // responsivePresets: [
  //   {
  //     label: 'xs',
  //     width: 375,
  //     height: 560
  //   },
  //   {
  //     label: 'sm',
  //     width: 465,
  //     height: 560
  //   },
  //   {
  //     label: 'md',
  //     width: 768,
  //     height: 560
  //   },
  //   {
  //     label: 'lg',
  //     width: 1024,
  //     height: 560
  //   },
  //   {
  //     label: 'xl',
  //     width: 1600,
  //     height: 560
  //   },
  //   {
  //     label: '2xl',
  //     width: 1920,
  //     height: 560
  //   },
  //   {
  //     label: '3xl',
  //     width: 2560,
  //     height: 560
  //   }
  // ],
  // backgroundPresets: [
  //   {
  //     label: 'Transparent',
  //     color: 'transparent',
  //     contrastColor: '#333'
  //   },
  //   {
  //     label: 'Dark',
  //     color: '#212121',
  //     contrastColor: '#f9f9f9'
  //   },
  //   {
  //     label: 'Light',
  //     color: '#f9f9f9',
  //     contrastColor: '#212121'
  //   }
  // ],
  // autoApplyContrastColor: true,
  // vite: {
  //   server: {
  //     port: 3042
  //   }
  // }
})
