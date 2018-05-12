/**
 * 具体配置项请参阅 webpack-dev-server 的文档
 */
module.exports = {
  '/proxy/wristwatch': {
    target: 'http://wx.canplay.com.cn/wristwatch',
    pathRewrite: {"^/proxy/wristwatch" : ""},
    secure: false
  }
}
