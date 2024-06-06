import { useRef } from 'react'
import { useAtomValue, useSetAtom } from 'jotai'
import { MDXEditorMethods } from '@mdxeditor/editor'
import { throttle } from 'lodash' // TODO: remove lodash
import { NoteContent, saveNoteAtomAsync, selectedNoteAtom } from '../store'
import { ContentNote } from '../../../shared/types'
import { AUTO_SAVING_TIME } from '../../../shared/constants'

interface MarkdownEditorHookReturn {
  selectedNote: NoteContent | null
  editorRef: React.RefObject<MDXEditorMethods>
  handleAutoSaving: (content: ContentNote) => Promise<void>
  handleBlur: () => Promise<void>
}

export function useMarkdownEditor(): MarkdownEditorHookReturn {
  const editorRef = useRef<MDXEditorMethods>(null)
  const selectedNote = useAtomValue(selectedNoteAtom)
  const saveNote = useSetAtom(saveNoteAtomAsync)

  // TODO: handle correctly the selectedNote, when user change very fast of note
  const handleAutoSaving = throttle(
    async (content: ContentNote): Promise<void> => {
      if (!selectedNote) return

      await saveNote(content)
    },
    AUTO_SAVING_TIME,
    {
      leading: false,
      trailing: true
    }
  )

  const handleBlur = async (): Promise<void> => {
    if (!selectedNote) return

    handleAutoSaving.cancel()

    const content = editorRef.current?.getMarkdown()

    if (content) {
      await saveNote(content)
    }
  }

  return {
    selectedNote,
    editorRef,
    handleAutoSaving,
    handleBlur
  }
}
