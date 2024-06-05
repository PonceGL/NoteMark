import { ElectronAPI } from '@electron-toolkit/preload'
import {
  CreateNote,
  DeleteNote,
  GetNotes,
  ReadNote,
  ShowNotification,
  WriteNote
} from '../shared/types'

export interface WindowAPI {
  locale: string
  getNotes: GetNotes
  readNote: ReadNote
  writeNote: WriteNote
  createNote: CreateNote
  deleteNote: DeleteNote
  showNotification: ShowNotification
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: WindowAPI
  }
}
