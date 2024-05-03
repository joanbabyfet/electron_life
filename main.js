//入口文件
const path = require('path')
const { app, BrowserWindow } = require('electron')
//引入配置
require('dotenv').config()

const is_dev = process.env.IS_DEV === "true" //当前环境
//屏蔽安全告警
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'
//忽略ssl证书检测
app.commandLine.appendSwitch('ignore-certificate-errors') 
//在 Electron 中，只有在 app 模块的 ready 事件被激发后才能创建浏览器窗口
app.on('ready', () => {
  //创建一个窗口
  const mainWindow = new BrowserWindow({
    fullscreen: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true, //设置该窗口js能访问node环境
    },
  })
  //窗口加载html文件
  //mainWindow.loadFile('index.html')
  mainWindow.loadURL(
    is_dev ? 'http://localhost:3002' : 
    `file://${path.join(__dirname, '../dist/index.html')}`
  )
  if (is_dev) {
    mainWindow.webContents.openDevTools()
  }
})