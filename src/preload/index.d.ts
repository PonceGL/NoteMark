import { ElectronAPI } from '@electron-toolkit/preload'
import { GetNotes, ReadNote } from '../shared/types'

export interface WindowAPI {
  locale: string
  getNotes: GetNotes
  readNote: ReadNote
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: WindowAPI
  }
}
