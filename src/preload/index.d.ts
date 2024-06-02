import { ElectronAPI } from '@electron-toolkit/preload'
import { CreateNote, DeleteNote, GetNotes, ReadNote, WriteNote } from '../shared/types'

export interface WindowAPI {
  locale: string
  getNotes: GetNotes
  readNote: ReadNote
  writeNote: WriteNote
  createNote: CreateNote
  deleteNote: DeleteNote
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: WindowAPI
  }
}
