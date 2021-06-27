module.exports = {
  productionSourceMap: false,
  devServer: {
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 8080,
    https: false,
    hotOnly: true,
    overlay: {
      warnings: false,
      errors: true
    }
  },
  pluginOptions: {
    lintStyleOnBuild: true,
    stylelint: {
      fix: false,
      files: ['src/**/*.vue', 'src/**/*.less']
    }
  }
}
