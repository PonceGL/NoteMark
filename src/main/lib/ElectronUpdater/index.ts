import { dialog } from 'electron'
import { ProgressInfo, UpdateInfo, autoUpdater, type AppUpdater } from 'electron-updater'
import { showNotification } from '../MainProcessModules'

export function getAutoUpdater(): AppUpdater {
  return autoUpdater
}

export function checkUpdates(): void {
  autoUpdater.checkForUpdates()
}

export async function updateAvailable(info: UpdateInfo): Promise<void> {
  console.log('====================================')
  console.log('Update available')
  console.log(info)
  console.log('====================================')

  showNotification({
    title: 'Update available',
    body: `A new version of the app is available!`,
    actions: [
      { type: 'button', text: 'Download' },
      { type: 'button', text: 'Skip' }
    ],
    onNotificationAction: (_, index: number) => {
      if (index === 0) autoUpdater.downloadUpdate()
    }
  })
}

export async function updateNotAvailable(info: UpdateInfo): Promise<void> {
  console.log('====================================')
  console.log('Update available')
  console.log(info)
  console.log('====================================')
  await dialog.showMessageBox({
    type: 'info',
    title: 'Update not available',
    message: `you are up-to-date!`
  })
}

export async function downloadProgress(progress: ProgressInfo): Promise<void> {
  const log_message = `Download speed: ${progress.bytesPerSecond} - Downloaded ${progress.percent}% (${progress.transferred}/${progress.total})`
  console.log('====================================')
  console.log('downloadProgress')
  console.log(progress)
  console.log('log_message')
  console.log(log_message)
  console.log('====================================')
}

export async function updateDownloaded(info: UpdateInfo): Promise<void> {
  console.log('====================================')
  console.log('Update downloaded')
  console.log(info)
  console.log('====================================')
  autoUpdater.quitAndInstall()
}

export async function errorInUpdate(error: Error): Promise<void> {
  console.log('====================================')
  console.log('Update error')
  console.log(error)
  console.log('====================================')
  await dialog.showMessageBox({
    type: 'error',
    title: 'Update failed',
    message: `An error occurred while updating.`
  })
}
