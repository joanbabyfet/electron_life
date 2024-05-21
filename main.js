//入口文件
const path = require('path')
const { app, BrowserWindow } = require('electron')
//引入配置
require('dotenv').config()

const is_dev = process.env.NODE_ENV === 'development' //当前环境
//屏蔽安全告警
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'
//忽略ssl证书检测
app.commandLine.appendSwitch('ignore-certificate-errors') 
//在 Electron 中，只有在 app 模块的 ready 事件被激发后才能创建浏览器窗口
app.on('ready', () => {
  //创建一个窗口
  const mainWindow = new BrowserWindow({
    //fullscreen: true,
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true, //设置该窗口js能访问node环境
      contextIsolation: false, //设置false后才可在渲染进程中使用electron api
    },
  })
  //窗口加载html文件
  //mainWindow.loadFile('index.html')
  mainWindow.loadURL(process.env.APP_URL)
  if (is_dev) {
    mainWindow.webContents.openDevTools()
  } else {
    mainWindow.removeMenu()
  }
})

// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 因此，通常对程序和它们在
// 任务栏上的图标来说，应当保持活跃状态，直到用户使用 Cmd + Q 退出
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})