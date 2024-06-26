import { app, shell, BrowserWindow, ipcMain, Notification, Menu } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { createNote, deleteNote, getNotes, readNote, writeNote } from './lib/NodeFiles'
import {
  CreateNote,
  DarkModeToggle,
  DeleteNote,
  GetNotes,
  ReadNote,
  SetupSystemTheme,
  ShowNotification,
  WriteNote
} from '../shared/types'
import { autoUpdater, UpdateInfo, ProgressInfo } from 'electron-updater'
import {
  checkUpdates,
  downloadProgress,
  errorInUpdate,
  updateAvailable,
  updateDownloaded,
  updateNotAvailable
} from './lib/ElectronUpdater'
import { showNotification } from './lib/MainProcessModules'
import { setupSystemTheme, darkModeToggle } from './lib/Native'
import { customMenu } from './lib/Native'

autoUpdater.autoDownload = false
autoUpdater.autoInstallOnAppQuit = false

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: true,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    center: true,
    title: 'NoteMark',
    frame: false,
    vibrancy: 'under-window', // only on macOS
    visualEffectState: 'active', // only on macOS
    titleBarStyle: 'hidden',
    trafficLightPosition: { x: 15, y: 10 },
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      spellcheck: true
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

Menu.setApplicationMenu(customMenu)

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))
  ipcMain.handle('getNotes', (_, ...args: Parameters<GetNotes>) => getNotes(...args)) // first argument is event, so we ignore it
  ipcMain.handle('readNote', (_, ...args: Parameters<ReadNote>) => readNote(...args))
  ipcMain.handle('writeNote', (_, ...args: Parameters<WriteNote>) => writeNote(...args))
  ipcMain.handle('createNote', (_, ...args: Parameters<CreateNote>) => createNote(...args))
  ipcMain.handle('deleteNote', (_, ...args: Parameters<DeleteNote>) => deleteNote(...args))
  ipcMain.handle('showNotification', (_, ...args: Parameters<ShowNotification>) =>
    showNotification(...args)
  )
  ipcMain.handle('dark-mode:toggle', (_, ...args: Parameters<DarkModeToggle>) =>
    darkModeToggle(...args)
  )
  ipcMain.handle('dark-mode:system', (_, ...args: Parameters<SetupSystemTheme>) =>
    setupSystemTheme(...args)
  )

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  checkUpdates()
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

app.on('ready', function () {
  autoUpdater.checkForUpdates()
  new Notification()
  setupSystemTheme()
})

autoUpdater.on('checking-for-update', () => {
  console.log('====================================')
  console.log('checking-for-update')
  console.log('====================================')
})
autoUpdater.on('update-available', (info: UpdateInfo) => updateAvailable(info))
autoUpdater.on('update-not-available', (info: UpdateInfo) => updateNotAvailable(info))
autoUpdater.on('error', (err: Error) => errorInUpdate(err))
autoUpdater.on('download-progress', (progressObj: ProgressInfo) => downloadProgress(progressObj))
autoUpdater.on('update-downloaded', (info: UpdateInfo) => updateDownloaded(info))
