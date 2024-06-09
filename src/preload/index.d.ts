import { ElectronAPI } from '@electron-toolkit/preload'
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

export interface WindowAPI {
  locale: string
  getNotes: GetNotes
  readNote: ReadNote
  writeNote: WriteNote
  createNote: CreateNote
  deleteNote: DeleteNote
  showNotification: ShowNotification
  darkModeToggle: DarkModeToggle
  setupSystemTheme: SetupSystemTheme
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: WindowAPI
  }
}
