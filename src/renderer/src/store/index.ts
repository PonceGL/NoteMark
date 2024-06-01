import { atom } from 'jotai'
import { ContentNote, NoteInfo } from '../../../shared/models'
import { notesMock } from './mocks'

export interface NoteContent extends NoteInfo {
  content: ContentNote
}

export const notesAtom = atom<NoteInfo[]>(notesMock)

export const selectedNoteByIdAtom = atom<string | null>(null)

export const selectedNoteAtom = atom((get): NoteContent | null => {
  const notes = get(notesAtom)
  const selectedNoteById = get(selectedNoteByIdAtom)

  if (selectedNoteById === null) return null

  const selectedNote = notes.find((note) => note.id === selectedNoteById)
  if (!selectedNote) return null

  return {
    ...selectedNote,
    content: `Hello from Note ${selectedNoteById}`
  }
})
