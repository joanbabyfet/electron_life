//入口文件
const path = require('path')
const { app, BrowserWindow } = require('electron')
//忽略ssl证书检测
app.commandLine.appendSwitch('ignore-certificate-errors') 
//在 Electron 中，只有在 app 模块的 ready 事件被激发后才能创建浏览器窗口
app.on('ready', () => {
  //创建一个窗口
  const mainWindow = new BrowserWindow({
    //fullscreen: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true, //设置该窗口js能访问node环境
    },
  })
  //窗口加载html文件
  //mainWindow.loadFile('index.html')
  mainWindow.loadURL(
    'http://localhost:3002'
  )
})