/**
 * 路由管理页面，只在开发时使用到
 * @title 为 document.title
 * @from 为 访问路径
 * @to 为 实际的访问路径
 * @type {{rewrites: *[]}}
 *
 * 因为该工程为一个多页应用工程， 每一个 view 就是一个 html ， rewrites 的作用就是在开发的时候不需要再写页面后缀
 * 如果实际上生产的话需要 nginx 配置对应部署方案
 *
 *
 * 这里给一个简单的 nginx 配置
 *
    location / {
			root /project-root/dist;
			rewrite ^/([^/]*)$ /$1.html break;
		}
 *
 *
 * exp:
 *
 * 这样配置之后，开发环境和生产环境就可以同步使用路径来访问页面了，而不是 .html 结尾
 * https://127.0.0.1/test
 * https://127.0.0.1/test2
 *
 *
 */


module.exports = {
  "rewrites": [
    {
      "title": "测试",
      "from": "/test",
      "to": "/test.html"
    },
    {
      "title": "测试2",
      "from": "/test2",
      "to": "/test2.html"
    }
  ]
}
