import { ElectronAPI } from '@electron-toolkit/preload'

export interface WindowAPI {
  locale: string
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: WindowAPI
  }
}
