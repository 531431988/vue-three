const plugins = ['@vue/babel-plugin-transform-vue-jsx']
// 生产环境移除console
if (process.env.NODE_ENV === 'production') {
  plugins.push('transform-remove-console')
}
module.exports = {
  presets: [
    // ['@vue/cli-plugin-babel/preset'],
    [
      '@vue/app',
      {
        modules: false,
        polyfills: ['es6.promise', 'es6.symbol'],
        targets: {
          browsers: [
            '> 1%',
            'last 2 versions',
            'not ie <= 8',
            'Android >= 4',
            'iOS >= 8',
          ],
        },
        useBuiltIns: 'entry',
      },
    ],
  ],
  plugins: [
    ...plugins,
    [
      'import',
      {
        libraryName: 'ant-design-vue',
        libraryDirectory: 'es',
        style: true,
      },
    ],
  ],
}
