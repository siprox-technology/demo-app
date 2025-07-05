const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  // Output the built files to the TYPO3 public directory
  outputDir: '../public/vue-frontend',
  // Set the public path for production
  publicPath: process.env.NODE_ENV === 'production' ? '/vue-frontend/' : '/',
  // Configure the dev server
  devServer: {
    proxy: {
      // Proxy API requests to TYPO3 backend
      '/api': {
        target: 'https://demoapp.de.test',
        changeOrigin: true
      }
    }
  }
})
