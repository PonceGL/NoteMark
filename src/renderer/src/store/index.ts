import { atom } from 'jotai'
import { unwrap } from 'jotai/utils'
import { ContentNote, NoteInfo } from '../../../shared/types'
import { WELCOME_NOTE_FILE_NAME } from '../../../shared/constants'
import { getTitle } from '../utils/notes'

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
  const selectedNoteId = get(selectedNoteByIdAtom)

  if (selectedNoteId === null && !notes) return null

  const isWelcomeNote = notes.length === 1 && notes[0].id === WELCOME_NOTE_FILE_NAME
  if (selectedNoteId === null || isWelcomeNote) {
    const content = await window.api.readNote(notes[0].id)
    return { ...notes[0], content: content }
  }

  const selectedNote = notes.find((note) => note.id === selectedNoteId)

  if (selectedNote) {
    const content = await window.api.readNote(selectedNote.id)

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

  const id = await window.api.createNote()
  if (!id) return

  const newNote: NoteInfo = {
    id,
    title: '',
    lastEditTime: Date.now()
  }

  set(notesAtom, [newNote, ...notes])
  set(selectedNoteByIdAtom, id)
})

export const saveNoteAtomAsync = atom(
  null,
  async (get, set, newContent: ContentNote): Promise<void> => {
    const notes = get(notesAtom)
    const selectedNote = get(selectedNoteAtom)

    if (!selectedNote || !notes) return

    const { id } = selectedNote

    const content = await window.api.readNote(id)
    const title = getTitle(content)

    window.api.writeNote(id, newContent)

    set(
      notesAtom,
      notes.map((note) => {
        if (note.id === selectedNote.id) {
          return {
            ...note,
            title: title,
            lastEditTime: Date.now()
          }
        }
        return note
      })
    )
  }
)

export const deleteNoteAtom = atom(null, async (get, set) => {
  const notes = get(notesAtom)
  const selectedNote = get(selectedNoteAtom)

  if (!selectedNote || !notes) return

  const isDeleted = await window.api.deleteNote(selectedNote.id)

  if (!isDeleted) return

  set(
    notesAtom,
    notes.filter((note) => note.id !== selectedNote.id)
  )

  set(selectedNoteByIdAtom, null)
})
