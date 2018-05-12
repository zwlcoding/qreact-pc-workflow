/**
 * 版本号打包规则依赖 package.json 中的 version 字段
 */
const pkg = require('../package.json')
const md5 = require('md5')
const colors = require('colors')
const logColorConfig = require('./logColor.config')
colors.setTheme(logColorConfig)

function getVersionHash(){
  let versonMd5 = md5(pkg.version)
  versonMd5 = versonMd5.substring(0,8)
  console.log(('pkg version md5 is '+versonMd5).boom)
  return versonMd5
}
const pubVersion =  getVersionHash()

module.exports = pubVersion
