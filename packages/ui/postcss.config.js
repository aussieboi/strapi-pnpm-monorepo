export default {
  plugins: {
    'postcss-preset-env': {
      browsers: "defaults and supports es6-module and supports css-grid and supports proxy and not dead",
      autoprefixer: false,
      stage: 1,
      preserve: true,
      importFrom: [
        './src/assets/postcss/_media.pcss',
      ],
      exportTo: [
        './src/vars.ts',
      ],
      features: {
        'custom-properties': {
          disableDeprecationNotice: true,
        },
        'custom-media-queries': {
          disableDeprecationNotice: true,
          preserve: true
        }
      },
    },
  },
};
