import { atom } from 'jotai'
import { NoteInfo } from '../../../shared/models'
import { notesMock } from './mocks'

export const notesAtom = atom<NoteInfo[]>(notesMock)

export const selectedNoteByIdAtom = atom<string | null>(null)

export const selectedNoteAtom = atom((get) => {
  const notes = get(notesAtom)
  const selectedNoteById = get(selectedNoteByIdAtom)

  if (selectedNoteById === null) return null

  const selectedNote = notes.find((note) => note.id === selectedNoteById)

  return {
    ...selectedNote,
    content: `Hello from Note ${selectedNoteById}`
  }
})
