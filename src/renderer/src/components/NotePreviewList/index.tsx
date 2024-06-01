import { ComponentProps } from 'react'
import { notesMock } from '../../store/mocks'
import { NotePreview } from '../NotePreview'
import { useNotesList } from '../../hooks'

interface NotePreviewListProps extends ComponentProps<'ul'> {
  onSelect?: () => void
}

export function NotePreviewList({
  className,
  onSelect,
  ...props
}: NotePreviewListProps): JSX.Element {
  const { notes, selectedNoteById, handleNoteSelected } = useNotesList({ onSelect })
  return (
    <ul className={className} {...props}>
      {notes.length === 0 ? (
        <li className="w-full inline-block mb-2 text-xs font-light text-left">No Notes Yet!</li>
      ) : (
        <>
          {notesMock.map((note) => (
            <li key={note.id}>
              <NotePreview
                isActive={selectedNoteById === note.id}
                onClick={handleNoteSelected(note.id)}
                {...note}
              />
            </li>
          ))}
        </>
      )}
    </ul>
  )
}
