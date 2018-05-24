/**
 * 具体配置项请参阅 webpack-dev-server 的文档
 */
module.exports = {
  '/proxy/api': {
    target: 'http://test.domain.com/api',
    pathRewrite: {"^/proxy/api" : ""},
    secure: false
  }
}
