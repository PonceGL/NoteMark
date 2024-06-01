import { ElectronAPI } from '@electron-toolkit/preload'
import { GetNotes } from '../shared/types'

export interface WindowAPI {
  locale: string
  getNotes: GetNotes
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: WindowAPI
  }
}
