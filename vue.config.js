const path = require('path');

module.exports = {
  publicPath: '/user',
  outputDir: 'server/public',
  assetsDir: 'static',
  productionSourceMap: false,
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "~@/assets/sass/index.scss";',
      },
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.join(__dirname, './src'),
      },
    },
  },
  devServer: {
    port: 8001,
    proxy: {
      '^/user/api': {
        target: 'http://localhost:8000',
      },
      '^/upload': {
        target: 'http://localhost:8000',
      },
    },
  },
};