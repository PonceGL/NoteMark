import { useAtomValue } from 'jotai'
import { NoteContent, selectedNoteAtom } from '../store'

interface MarkdownEditorHookReturn {
  selectedNote: NoteContent | null
}

export function useMarkdownEditor(): MarkdownEditorHookReturn {
  const selectedNote = useAtomValue(selectedNoteAtom)

  return {
    selectedNote
  }
}
