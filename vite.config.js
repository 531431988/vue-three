
import babel from "vite-babel-plugin";
const path = require('path')
const env = process.env.NODE_ENV === 'production'
const resolve = dir => path.join(__dirname, dir)
module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
    return config
  },
  configureWebpack: config => {
    config.resolve.extensions = ['.vue', '.js', '.jsx', '.json', '.less', '.css', '.scss', '.jpg', '.png', '.svg']
  },
  cssPreprocessOptions: {
    less: {
      modifyVars: {
        'primary-color': '#36a065',
        'warning-color': '#fa6400',
        'link-color': '#333',
        'link-hover-color': '#36a065'
      },
      javascriptEnabled: true
    }
  },
  plugins: [
    babel(),
  ],
  outputDir: process.env.VUE_APP_OUTPUTDIR,
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  productionSourceMap: false
}
