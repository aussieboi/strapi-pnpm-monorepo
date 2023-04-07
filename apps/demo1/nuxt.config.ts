// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  typescript: {
    strict: true
  },
  appConfig: {
    performance: true
  },
  extends: "nuxt-seo-kit",
  modules: [
    '@nuxtjs/i18n',
    '@nuxt/devtools',
    '@nuxt/image-edge',
    '@nuxtjs/partytown',
    'nuxt-security',
    "@vueuse/nuxt"
  ],
  build: {
    transpile: ["gsap"]
  },
  i18n: {
    locales: [{
      code: "ar-AE",
      dir: "rtl",
      file: "ar-AE.json",
      name: "Arabic",
      iso: "ar"
    }, {
      code: "en-US",
      dir: "ltr",
      file: "en-US.json",
      name: "English",
      iso: "en"
    }],
    defaultLocale: "ar-AE",
    lazy: true,
    types: "composition",
    langDir: "locales/",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirect",
      redirectOn: "root"
    },
    vueI18n: {
      legacy: false,
    }
  },
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL ?? 'https://localhost:3000/',
    },
  },
  postcss: {
    plugins: {
      'postcss-import': true,
      'postcss-preset-env': {
        autoprefixer: false,
        stage: 1,
       
        features: {
          'custom-properties': {
            disableDeprecationNotice: true,
            preserve: true
          },
          'custom-media-queries': {
            disableDeprecationNotice: true,
            preserve: true
          }
        }
      },
    },
  },
  security: {
    headers: {
      crossOriginEmbedderPolicy: process.env.NODE_ENV === 'development' ? 'unsafe-none' : 'require-corp',
      contentSecurityPolicy: {
        /**
         * Default configuration
         * https://nuxt-security.vercel.app/getting-started/configuration#default-configuration
         */
        'script-src-elem': ["'self'", "'unsafe-inline'"],
        'worker-src': ["'self'", 'blob:']
      }
    }
  },
})
