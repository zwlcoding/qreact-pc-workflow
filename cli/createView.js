/**
 * 自动化创建项目模块目录，待继续完善
 */

const fs = require('fs')
const path = require('path')
const exec = require('child_process').exec;

const appRoot = require('app-root-path');
// console.log(appRoot.path)

const inquirer = require('inquirer');
const routerConfig = require('../config/router.config')

const colors = require('colors')
const logColorConfig = require('./logColor.config')
colors.setTheme(logColorConfig)

//交互式创建新的 view
inquirer.prompt([
  {
    type: 'input',
    name: 'title',
    message: '请输入页面标题【document.title】=> '
  },
  {
    type: 'input',
    name: 'from',
    message: '请输入页面路由地址【exp:/login】=> '
  }
])
  .then(answers => {


    if (answers.title === '') {
      console.log('页面标题请不要为空'.error)
      return false
    }

    if (answers.from === '') {
      console.log('页面路由地址请不要为空'.error)
      return false
    }

    if (answers.from.indexOf('/') !== 0) {
      console.log('页面路由地址格式不正确，正确的格式为【/router】'.error)
      return false
    }

    let checkTit = false
    let checkHas = false
    let routerObj = {
      title: answers.title,
      from: answers.from,
      to: `${answers.from}.html`
    }

    routerConfig.rewrites.map((routerItem) => {
      if (routerItem.from === answers.from) {
        checkHas = true
      }
      if (routerItem.title === answers.title) {
        checkTit = true
      }
    })

    if(checkTit){
      console.log('已存在相同的document.title'.warn)
    }

    if (checkHas) {
      console.log('已存在该路由，请重新命名'.error)
      return false
    }

    routerConfig.rewrites.push(routerObj)

    let fileText = `module.exports = ${JSON.stringify(routerConfig, null, 2)}`
    let writeFilePath = path.resolve(__dirname, `${appRoot}/config/router.config.js`)

    fs.writeFile(writeFilePath, fileText, function (err) {
      if (err) console.log('写文件操作失败');
      else console.log('写文件操作成功');
    });


    let routeKey = answers.from.replace('/', '')

    exec(`cd ${appRoot}/src/views && mkdir ${routeKey}`, () => {
      console.log('创建目录成功'.info)

      exec(`cd ${appRoot}/src/views/${routeKey} && mkdir components && mkdir entry && mkdir css && mkdir js && mkdir static`, () => {
        console.log('创建结构成功'.info)
        exec(`cd ${appRoot}/src/views/${routeKey} && touch ${routeKey}.js`)
        exec(`cd ${appRoot}/src/views/${routeKey} && cd entry && touch app.jsx`)
        exec(`cd ${appRoot}/src/views/${routeKey} && cd css && touch style.less`)
      })


    })
  });
