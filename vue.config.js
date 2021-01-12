const path = require('path')
module.exports = {
  devServer: {
      host: '0.0.0.0',
      port: '8081'
  },
  // publicPath: './',
  // outputDir: 'dist',
  // assetsDir: 'static',
  lintOnSave:false,
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, './src/assets/less/variable.less')
      ]
    }
  }
}
