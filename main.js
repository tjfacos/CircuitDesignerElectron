// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu, MenuItem } = require('electron')
const path = require('path')


// const { openHelpDialog } = require("./public/js/dialog.js")

const createWindow = () => {

  const mainWindow = new BrowserWindow({
    icon: __dirname + '/assets/icons/favicon.ico',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // Form menu

  let menu = new Menu()
  
  helpItem = new MenuItem({
    "click" : () => {
      mainWindow.webContents.executeJavaScript("openHelpDialog()")
    }, 
    "label" : "Help"
  })
  
  menu.append(helpItem)

  mainWindow.maximize()
  mainWindow.loadFile('public/index.html')
  mainWindow.setMenu(menu)

  
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.