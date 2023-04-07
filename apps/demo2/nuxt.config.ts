import vitePluginStylelint from 'vite-plugin-stylelint'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      strapi: {
        /* Strapi defaults */
        // url: process.env.STRAPI_URL ?? 'http://localhost:1337',
        // prefix: '/api',
        // version: 'v4',
        // cookie: {},
        // cookieName: 'strapi_jwt'
      }
    }
  },
  vite: {
    plugins: [
      vitePluginStylelint({
        include: [
          'layouts/**/*.{vue}',
          'components/**/*.{vue}',
          'pages/**/*.{vue}'
        ]
      })
    ]
  },
  typescript: {
    strict: true
  },
  appConfig: {
    performance: true
  },
  build: {
    transpile: ['gsap']
  },
  extends: 'nuxt-seo-kit',
  modules: [
    '@nuxt/devtools',
    '@nuxt/image-edge',
    '@nuxtjs/i18n',
    '@nuxtjs/partytown',
    '@vueuse/nuxt',
    'nuxt-security',
    'nuxt-svgo',
    'nuxt-vitest',
    '@vue-macros/nuxt',
    '@demo/ui/nuxt',
    '@nuxtjs/strapi'
  ],
  components: [
    {
      path: '~/components/',
      pathPrefix: false
    }
  ],
  postcss: {
    plugins: {
      'postcss-import': true,
      'postcss-preset-env': {
        autoPrefixer: false,
        stage: 1
      }
    }
  },
  sourcemap: {
    client: process.env.NODE_ENV === 'development',
    server: process.env.NODE_ENV === 'development'
  },

  strapi: {
    devtools: true
  },
  /**
   * Nuxt DevTools
   * https://github.com/nuxt/devtools
   */
  devtools: {
    enabled: process.env.NODE_ENV === 'development'
  },

  /**
  * Nuxt Seo Kit Modules
  * https://github.com/harlan-zw/nuxt-seo-kit
  *
  * https://github.com/harlan-zw/nuxt-simple-sitemap - Sitemap.xml Support
  * https://github.com/harlan-zw/nuxt-simple-robots - Manage site crawling
  * https://unhead-schema-org.harlanzw.com/ - Generate Schema.org JSON-LD for SEO
  * https://github.com/harlan-zw/nuxt-unhead - Experimental SEO meta features
  * https://github.com/harlan-zw/nuxt-og-image - Generate dynamic social share images
  * https://github.com/harlan-zw/nuxt-link-checker - Check for broken links
  *
  *  You can extend each module by it's config property
  */
  // sitemap:{},
  // robots:{},
  // schemaOrg:{},
  // unhead:{}
  // ogImage:{},
  // linkChecker:{}

  /**
 * Nuxt Image Module
 * https://v1.image.nuxtjs.org/
 * https://github.com/nuxt/image
 */
  // image: {},

  /**
  * I18n Module
  * https://v8.i18n.nuxtjs.org/
  * https://github.com/nuxt-modules/i18n
  */
  i18n: {
    vueI18n: {
      legacy: false
    }
    // locales: [
    //   {
    //     code: 'en-US',
    //     dir: 'ltr',
    //     file: 'en-US.json',
    //     name: 'English',
    //     iso: 'en'
    //   },
    //   {
    //     code: 'hr-HR',
    //     dir: 'ltr',
    //     file: 'hr-HR.json',
    //     name: 'Croatian',
    //     iso: 'hr'
    //   }
    // ],
    // defaultLocale: 'en',
    // lazy: true,
    // langDir: 'locales/',
    // detectBrowserLanguage: {
    //   useCookie: true,
    //   cookieKey: 'i18n_redirect',
    //   redirectOn: 'root'
    // }
  },

  /**
  * Partytown Module
  * https://partytown.builder.io/nuxt
  * https://github.com/nuxt-modules/partytown
  */
  // partytown: {},

  /**
   * VueUse
   * https://github.com/vueuse/vueuse
   */
  // vueuse: {},

  /**
  * Security Module
  * https://nuxt-security.vercel.app/
  * https://github.com/Baroshem/nuxt-security
  */
  security: {
    headers: {
      crossOriginEmbedderPolicy: process.env.NODE_ENV === 'development' ? 'unsafe-none' : 'require-corp',
    }
  }

  /**
  * Nuxt SVG
  * https://github.com/cpsoinos/nuxt-svgo
  */
  // svgo: {},

  /**
   * Vue Macros
   * https://vue-macros.sxzz.moe/
   *
   */
  // macros: {}
})
