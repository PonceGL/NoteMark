import { atom } from 'jotai'
import { ContentNote, NoteInfo } from '../../../shared/models'
import { notesMock } from './mocks'
import { newUUID } from '../utils/uuid'

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

export const createEmptyNoteAtom = atom(null, (get, set) => {
  const notes = get(notesAtom)

  const title = `New Note: ${notes.length + 1}`
  const id = newUUID()

  const newNote: NoteInfo = {
    id,
    title,
    lastEditTime: Date.now()
  }

  set(notesAtom, [...notes, newNote])
  set(selectedNoteByIdAtom, id)
})

export const deleteNoteAtom = atom(null, (get, set) => {
  const notes = get(notesAtom)
  const selectedNote = get(selectedNoteAtom)

  if (!selectedNote) return

  set(
    notesAtom,
    notes.filter((note) => note.id !== selectedNote.id)
  )

  set(selectedNoteByIdAtom, null)
})