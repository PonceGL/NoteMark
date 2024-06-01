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

const selectedNoteAtomAsync = atom(async (get): Promise<NoteContent | null> => {
  const notes = get(notesAtom)
  const selectedNoteById = get(selectedNoteByIdAtom)

  if (selectedNoteById === null || !notes) return null

  const selectedNote = notes.find((note) => note.id === selectedNoteById)
  if (!selectedNote) return null

  const content = await window.api.readNote(selectedNote.title)

  return {
    ...selectedNote,
    content: content
  }
})

export const selectedNoteAtom = unwrap(
  selectedNoteAtomAsync,
  (prev) =>
    prev ?? {
      id: '',
      title: '',
      lastEditTime: Date.now(),
      content: ''
    }
)

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

export const saveNoteAtom = atom(null, (get, set, newContent: ContentNote) => {
  const notes = get(notesAtom)
  const selectedNote = get(selectedNoteAtom)

  if (!selectedNote || !notes) return

  const { title } = selectedNote

  // save on disk
  window.api.writeNote(title, newContent)

  // update the saved note's last edit time

  set(
    notesAtom,
    notes.map((note) => {
      if (note.id === selectedNote.id) {
        return {
          ...note,
          lastEditTime: Date.now()
        }
      }
      return note
    })
  )
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
