const pkg = require('./package.json')
const path = require('path')
const webpack = require('webpack')

const autoprefixer = require('autoprefixer');


const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const es3ifyPlugin = require('es3ify-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin; //提取公共代码块插件
const ZipPlugin = require('zip-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');

const __viewList = require('./cli/getViewList');   //页面配置
const __versionHash = require('./cli/getVersionHash')



const __DOMAIN = pkg.domain
const __AUTHOR = pkg.author

const ProxyConfig = require('./config/proxy.config')
const RouterConfig = require('./config/router.config')

const postcssConfig = {
  ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
  plugins: () => [
    autoprefixer({
      browsers: ['> 5%', 'ie >= 8', 'iOS >= 7', 'Android >= 4'],
    })
  ],
  minimize: true //css压缩
}

let outputPath = './dev' //输出目录


//配置css 跟 js 的最终指向路径
let publicPathVal = '/'
//图片输出路径
let cssPathVal = 'css/[name].css'
let imgPathVal = 'static/images/[name].[ext]'
let fontPathVal = 'static/font/[name].[ext]'
//配置输出文件名
let jsPathVal = 'js/[name].js'

let envSts = process.env.NODE_ENV === 'production' ? true : false

//根据环境替换路径
if (envSts) {
  outputPath = './build'
  publicPathVal = `//${__DOMAIN}/`
  cssPathVal = `${__versionHash}/css/[name].min.css`
  imgPathVal = `${__versionHash}/static/images/[name].[ext]`
  fontPathVal = `${__versionHash}/static/font/[name].[ext]`
  jsPathVal = `${__versionHash}/js/[name].min.js`
}

let workConfig = {
  entry: __viewList.entry,
  output: {
    path: path.resolve(__dirname, outputPath),

    //静态资源路径
    publicPath: publicPathVal,

    //输出文件名
    filename: jsPathVal
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      'react': 'qreact/dist/ReactIE',
      'react-dom': 'qreact/dist/ReactIE',
      'redux': 'qreact/lib/ReduxIE',
      'prop-types': 'qreact/lib/ReactPropTypes',
      'create-react-class': 'qreact/lib/createClass',
    }
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract("style", "css?minimize!postcss!less")
      },
      {
        test: /\.(js|jsx)(\?.*$|$)/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader',
        query: {
          limit: 1,
          name: imgPathVal
        }
      },
      {
        test: /\.(eot|svg|ttf|woff)$/,
        loader: 'url-loader',
        query: {
          limit: 10240,
          name: fontPathVal
        }
      }
    ]
  },
  postcss: function () {
    return [autoprefixer({
      browsers: ["Chrome >= 1","Safari >= 1","Firefox >= 1","ie >= 8"] // 粗暴一点
    })];
  },
  plugins: [

    new es3ifyPlugin(),
    new ExtractTextPlugin(cssPathVal),

    //提取css并配置文件名
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': envSts ? JSON.stringify('production') : JSON.stringify('development')
    })

  ],
  devServer: {
    disableHostCheck: true,
    historyApiFallback: RouterConfig, //低版本重写无效？
    proxy: ProxyConfig,
    progress: true,
    //低版本的不支持before方法
    // before: (app) => {
    //   app.get('/', function (req, res) {
    //     let viewListDom = ''
    //     for (let viewKey in __viewList.title) {
    //       viewListDom += `<div><a href="./${viewKey}">${__viewList.title[viewKey]}</a></div>`
    //     }
    //     res.send(viewListDom);
    //   });
    // }
  },

  devtool: "source-map"
}


__viewList.chunk.map((viewKey) => {


  let baseChunk = {
    name: 'base',
    chunks: __viewList.chunk,
    minChunks: 2
  }
  workConfig.plugins.push(new CommonsChunkPlugin(baseChunk))

  let reactLibChunk = {
    name: 'reactLib',
    chunks: ['reactLib', 'base'],
    minChunks: 2
  }
  workConfig.plugins.push(new CommonsChunkPlugin(reactLibChunk))

  let htmlConfig = {
    title: __viewList.title[viewKey],
    inject: 'body',
    chunks: ['comLib', 'reactLib', 'base', viewKey],
    filename: `${viewKey}.html`,
    chunksSortMode: "manual",
    template: path.resolve(__dirname, './index.html')
  }
  if (envSts) {
    htmlConfig.minify = { //压缩HTML文件
      removeComments: true, //移除HTML中的注释
      collapseWhitespace: true //删除空白符与换行符
    }
  }

  workConfig.plugins.push(new HtmlWebpackPlugin(htmlConfig))

})


if (envSts) {

  workConfig.devtool = false

  workConfig.plugins = (workConfig.plugins || []).concat([

    new CleanWebpackPlugin(path.join(__dirname,'./dist')),

    new webpack.BannerPlugin(`power by ${__DOMAIN} ==> ${__AUTHOR} ==> version by ${__versionHash}`),

    //压缩js
    new UglifyJSPlugin({
      //干掉所有的 debugger 和 console
      uglifyOptions: {
        compress: {
          warnings: false,
          drop_debugger: true,
          drop_console: true
        }
      }

    }),

    new ImageminPlugin(),

    new ZipPlugin({
      path:path.join(__dirname,'./dist'),
      filename: 'dist.zip'
    })

  ])

}

module.exports = workConfig


