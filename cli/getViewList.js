/**
 * 打包构建时和生成HTML等会使用到这个配置
 * @type {*[]}
 */

let routerConfig = require('../config/router.config').rewrites

let viewList = {
  entry: {
    comLib: ['es5-shim', 'es5-shim/es5-sham', 'babel-polyfill'], // 低版本浏览器语法支持
    reactLib: ['react', 'react-dom']
  },
  title: {},
  chunk: []
}

routerConfig.map((routerItem) => {
  let viewKey = routerItem.from.replace('/', '')
  viewList.entry[viewKey] = `./src/views/${viewKey}/${viewKey}.js`
  viewList.title[viewKey] = `${routerItem.title}`
  viewList.chunk.push(viewKey)
})

console.log(viewList.chunk)

module.exports = viewList


