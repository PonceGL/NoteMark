import { ElectronAPI } from '@electron-toolkit/preload'
import { CreateNote, GetNotes, ReadNote, WriteNote } from '../shared/types'

export interface WindowAPI {
  locale: string
  getNotes: GetNotes
  readNote: ReadNote
  writeNote: WriteNote
  createNote: CreateNote
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: WindowAPI
  }
}
