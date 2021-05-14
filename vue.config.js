const path = require('path')
const webpack = require('webpack')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const FileManagerPlugin = require('filemanager-webpack-plugin')
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i
const env = process.env.NODE_ENV === 'production'
const resolve = dir => path.join(__dirname, dir)
module.exports = {
  chainWebpack: config => {
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .use('babel-loader')
      .loader('babel-loader')
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
      .options({
        svgo: {
          plugins: [
            { prefixIds: false },
            { cleanupIDs: false },
            { convertShapeToPath: false },
            { convertStyleToAttrs: false }
          ]
        }
      })
    config.resolve.alias
      .set('vue$', 'vue/dist/vue.esm.js')
      .set('@', resolve('src'))
      .set('@ant-design/icons/lib/dist$', resolve('./icons.js'))
    // 防止多页面打包卡顿
    // config.plugins.delete('named-chunks')
    return config
  },
  configureWebpack: config => {
    config.resolve.extensions = [
      '.vue',
      '.js',
      '.jsx',
      '.json',
      '.less',
      '.css',
      '.scss',
      '.jpg',
      '.png',
      '.svg'
    ]
    config.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/))
    /* if (env) {
      const plugins = []
      plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: productionGzipExtensions,
          threshold: 10240,
          minRatio: 0.8
        }),
        new FileManagerPlugin({
          events: {
            onEnd: {
              delete: [
                `./${process.env.VUE_APP_OUTPUTDIR}.zip`
              ],
              archive: [{
                source: `./${process.env.VUE_APP_OUTPUTDIR}`,
                destination: `./${process.env.VUE_APP_OUTPUTDIR}.zip`
              }]
            }
          }
        })
      )
      config.plugins = [...config.plugins, ...plugins]

      config.optimization = {
        splitChunks: {
          cacheGroups: {
            libs: {
              name: 'chunk-libs',
              test: /[\\/]node_modules[\\/]/,
              priority: 10,
              chunks: 'initial'
            },
            antvUI: {
              name: 'chunk-antvUI',
              priority: 20,
              test: /[\\/]node_modules[\\/]ant-design-vue[\\/]/,
              chunks: 'all'
            }
          }
        }
      }
    } */
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          /* 'primary-color': '#4CDEDF',
          'link-color': '#4CDEDF',
          'link-hover-color': '#4CDEDF',
          'warning-color': '#F6B03F',
          'table-header-bg': 'rgba(55,160,185,0.2)',
          'table-header-color': '#C2C2C2',
          'table-row-hover-bg': 'rgba(55,160,185,0.1)',
          'table-footer-color': 'transparent' */
        },
        javascriptEnabled: true
      }
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [resolve('./src/less/theme.less')]
    }
  },
  transpileDependencies: ['ant-design-vue', 'resize-detector'],
  outputDir: process.env.VUE_APP_OUTPUTDIR,
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  productionSourceMap: false
}
