module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        // useBuiltIns，根据 package.json 中的 browserslist 来确定是否转换新语法和按需引用 polyfill
        useBuiltIns: 'entry', // or 'usage'
        corejs: 2
      }
    ],
    // 可以使用简写 '@babel/react'
    '@babel/preset-react'
  ],
  plugins: [
    ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }],
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-transform-runtime'
  ]
  /*
    @babel/plugin-transform-runtime: 开发环境使用
    @babel/runtime-corejs2: 生产环境使用
  */
}
// 可以在配置中使用包名称的简写形式（删除preset-、plugin-或babel-plugin）