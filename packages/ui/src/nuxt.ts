

import { addComponentsDir, addImportsDir, createResolver, installModule, defineNuxtModule, useLogger } from '@nuxt/kit';
import { fileURLToPath } from 'url';

export default defineNuxtModule({
  meta: {
    name: "demo",
    configKey: "demo",
    compatibility: {
      nuxt: "^3.0.0",
      bridge: false
    },
    version: "0.0.1"
  },
  async setup(_, nuxt) {
    const rPath = (p: string) => fileURLToPath(new URL(p, import.meta.url).toString())
    const logger = useLogger('@demo/ui')
    logger.info('Adding components directory...')
    await addComponentsDir({
      path: rPath('./components'),
      pathPrefix: false,
      extensions: ["vue"]
    })
    logger.info('Components directory added')

    logger.info('Adding composables directory..')
    addImportsDir(rPath('./composables'))
    logger.info('Composables directory added')
    nuxt.options.css.unshift(rPath('./assets/postcss/style.pcss'));
    nuxt.options.css.unshift(rPath('./assets/postcss/_media.pcss'));
    const resolver = createResolver(import.meta.url)
    await installModule('@vueuse/nuxt')
  }
})

declare module "@nuxt/schema" {
  interface RuntimeConfig {
    demo: {};
  }
}
