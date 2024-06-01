import { useAtom, useAtomValue } from 'jotai'
import { notesAtom, selectedNoteByIdAtom } from '../store'
import { NoteInfo } from '../../../shared/types'

interface SelectedNoteReturn {
  notes: NoteInfo[]
  selectedNoteById: string | null
  handleNoteSelected: (index: string) => () => Promise<void>
}

interface SelectedNoteProps {
  onSelect?: () => void
}

export function useNotesList(props?: SelectedNoteProps): SelectedNoteReturn {
  const { onSelect } = props || {}
  const notes = useAtomValue(notesAtom) ?? []

  const [selectedNoteById, setSelectedNoteById] = useAtom(selectedNoteByIdAtom)

  const handleNoteSelected = (id: string) => async () => {
    setSelectedNoteById(id)
    if (typeof onSelect === 'function') {
      onSelect()
    }
  }

  return {
    notes,
    selectedNoteById,
    handleNoteSelected
  }
}
