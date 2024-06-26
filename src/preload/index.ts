import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import {
  CreateNote,
  DeleteNote,
  GetNotes,
  ReadNote,
  ShowNotification,
  WriteNote
} from '../shared/types'
import { NoteInfo } from '../shared/types'

// Custom APIs for renderer
const api = {
  locale: navigator.language,
  getNotes: (...args: Parameters<GetNotes>): Promise<NoteInfo[]> =>
    ipcRenderer.invoke('getNotes', ...args),
  readNote: (...args: Parameters<ReadNote>): Promise<NoteInfo[]> =>
    ipcRenderer.invoke('readNote', ...args),
  writeNote: (...args: Parameters<WriteNote>): Promise<NoteInfo[]> =>
    ipcRenderer.invoke('writeNote', ...args),
  createNote: (...args: Parameters<CreateNote>): Promise<NoteInfo[]> =>
    ipcRenderer.invoke('createNote', ...args),
  deleteNote: (...args: Parameters<DeleteNote>): Promise<NoteInfo[]> =>
    ipcRenderer.invoke('deleteNote', ...args),
  showNotification: (...args: Parameters<ShowNotification>): Promise<void> =>
    ipcRenderer.invoke('showNotification', ...args),
  darkModeToggle: (): Promise<void> => ipcRenderer.invoke('dark-mode:toggle'),
  setupSystemTheme: (): Promise<void> => ipcRenderer.invoke('dark-mode:system')
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
