import { atom } from 'jotai'
import { unwrap } from 'jotai/utils'
import { ContentNote, NoteInfo } from '../../../shared/types'
import { newUUID } from '../utils/uuid'

export interface NoteContent extends NoteInfo {
  content: ContentNote
}

function sortNotesByLastEditTime(notes: NoteInfo[]): NoteInfo[] {
  return notes.sort((a, b) => b.lastEditTime - a.lastEditTime)
}

async function loadNotes(): Promise<NoteInfo[]> {
  const notes = await window.api.getNotes()
  return sortNotesByLastEditTime(notes)
}

const notesAtomAsync = atom<NoteInfo[] | Promise<NoteInfo[]>>(loadNotes())

export const notesAtom = unwrap(notesAtomAsync, (prev) => prev)

export const selectedNoteByIdAtom = atom<string | null>(null)

export const selectedNoteAtom = atom((get): NoteContent | null => {
  const notes = get(notesAtom)
  const selectedNoteById = get(selectedNoteByIdAtom)

  if (selectedNoteById === null || !notes) return null

  const selectedNote = notes.find((note) => note.id === selectedNoteById)
  if (!selectedNote) return null

  return {
    ...selectedNote,
    content: `Hello from Note ${selectedNoteById}`
  }
})

export const createEmptyNoteAtom = atom(null, (get, set) => {
  const notes = get(notesAtom)

  if (!notes) return

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

  if (!selectedNote || !notes) return

  set(
    notesAtom,
    notes.filter((note) => note.id !== selectedNote.id)
  )

  set(selectedNoteByIdAtom, null)
})
