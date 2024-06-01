import { ElectronAPI } from '@electron-toolkit/preload'
import { GetNotes, ReadNote, WriteNote } from '../shared/types'

export interface WindowAPI {
  locale: string
  getNotes: GetNotes
  readNote: ReadNote
  writeNote: WriteNote
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: WindowAPI
  }
}
