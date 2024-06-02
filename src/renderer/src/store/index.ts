import { atom } from 'jotai'
import { unwrap } from 'jotai/utils'
import { ContentNote, NoteInfo } from '../../../shared/types'
import { newUUID } from '../utils/uuid'
import { WELCOME_NOTE_FILE_NAME } from '../../../shared/constants'

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
  const notes = get(notesAtom) ?? []
  const selectedNoteById = get(selectedNoteByIdAtom)

  if (selectedNoteById === null && !notes) return null

  const isWelcomeNote = notes.length === 1 && notes[0].title === WELCOME_NOTE_FILE_NAME
  if (selectedNoteById === null || isWelcomeNote) {
    const content = await window.api.readNote(notes[0].title)
    return { ...notes[0], content: content }
  }

  const selectedNote = notes.find((note) => note.id === selectedNoteById)

  if (selectedNote) {
    const content = await window.api.readNote(selectedNote.title)

    return {
      ...selectedNote,
      content: content
    }
  }

  return null
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

export const createEmptyNoteAtom = atom(null, async (get, set) => {
  const notes = get(notesAtom)

  if (!notes) return

  const title = await window.api.createNote()
  if (!title) return
  const id = newUUID()

  const newNote: NoteInfo = {
    id,
    title,
    // lastEditTime: new Date().getTime()
    lastEditTime: Date.now()
  }

  set(notesAtom, [newNote, ...notes])
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

export const deleteNoteAtom = atom(null, async (get, set) => {
  const notes = get(notesAtom)
  const selectedNote = get(selectedNoteAtom)

  if (!selectedNote || !notes) return

  const isDeleted = await window.api.deleteNote(selectedNote.title)

  if (!isDeleted) return

  set(
    notesAtom,
    notes.filter((note) => note.id !== selectedNote.id)
  )

  set(selectedNoteByIdAtom, null)
})
