## PC 端 qreact 多页应用工作流

支持 ie8 +

---

### 目录结构
```
|-build //打包的临时目录，不会上传到 git
|-cli   //脚手架工具
  |-createView.js   //交互式命令行创建view，一个view就是一个页面
  |-getVersionHash.js //版本号hash，依赖 package.json 中的 version 字段
  |-getViewList.js    //路由配置，用户构建html和提取公共chunk时会用到
  |-logColor.config.js  //控制台颜色，开发时才会用到
|-config
  |-proxy.config.js //接口反向代理配置
  |-router.config.js //路由配置，编译的入口依赖这个配置，比如有 A ，B， C 三个 view， 但是这里只配置了 A,B 那么最终 C 不会构建 
|-dev //保留目录。便于做一些开发时的调试
|-dist //最终构建目录，会生成一个 zip 文件
|-src
  |- ... 其他的为可有可无的公共目录
  |-views【注意】views为整个项目的核心
    |-test【注意】建议使用 cli 工具来创建目录，没一个目录，都对应到一个页面，比如你有 testA 、 testB 目录,最终会生成出 testA.html 和 testB.html 两个页面
      |-components 
      |-css
        |-style.less
      |-entry
        |-app.jsx
      |-js
      |-static
      |-test.js 【注意】这个JS的名称，必须与目录名称保持一致
|-index.html  //构建模板,如果需要插入CDN的js什么的，可以直接写在这里
|-webpack.config.js //编译配置
|-package.json 编译需依赖该配置文件下的几个字段
  |- version  构建的版本号hash依赖这个值
  |- author   静态资源注释需要依赖这个字段/*! power by you.delopy.com ==> Por.Zhang ==> version by 47cd76e4 */
  |- domain   会影响html中，CSS中，静态资源的加载域名
```


### 命令行说明

```shell
npm run dev
#支持热更新的开发模式，端口9000
```

```shell
npm run ie8
#使用文件监听模式，支持在 ie8 下调试项目，端口 9001
```

```shell
npm run build
#构建生产环境zip包
```

```shell
npm run create
#创建新的 view 
```




---
---


## qreact multi-page application workflow on the PC side

Support ie8 +

---

### Directory Structure
```
|-build // Packaged temp directory, not uploaded to git
|-cli // scaffolding tools
  |-createView.js //The interactive command line creates the view, a view is a page
  |-getVersionHash.js //Version hash, depending on the version field in package.json
  |-getViewList.js //Route configuration, used by users when building html and extracting public chunks
  |-logColor.config.js //console color, used only when developing
|-config
  |-proxy.config.js //interface reverse proxy configuration
  |-router.config.js //Router configuration, the compiler's entry depends on this configuration, for example there are three views of A, B, C, but only configured A, B then the final C will not build
|-dev //preserve the directory. Easy to do some debugging during development
|-dist //The final build directory will generate a zip file
|-src
  |- ... Others are optional public directories
  |-views [Note] views are the core of the entire project
    |-test [Note] It is recommended to use the cli tool to create a directory. There is no directory that corresponds to a page. For example, you have testA and testB directories. Finally, testA.html and testB.html pages are generated.
      |-components
      |-css
        |-style.less
      |-entry
        |-app.jsx
      |-js
      |-static
      |-test.js [Note] The name of this JS must be consistent with the directory name.
|-index.html //build template, if you need to insert CDN's js, you can write it directly here
|-webpack.config.js //Compile configuration
|-package.json Compile depends on several fields under the configuration file
   |- version Build version hash depends on this value
   |- author Static resource annotations need to depend on this field /*! power by you.delopy.com ==> Por.Zhang ==> version by 47cd76e4 */
   |- domain will affect html, CSS, static resource loading domain
```


### Command line description

```shell
Npm run dev
# Support hot update development mode, port 9000
```

```shell
Npm run ie8
# Use file listening mode to support debugging project under ie8, port 9001
```

```shell
Npm run build
# Build a production environment zip package
```

```shell
Npm run create
#Create a new view
```



