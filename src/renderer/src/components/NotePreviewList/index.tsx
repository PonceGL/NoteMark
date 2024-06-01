import { ComponentProps } from 'react'
import { notesMock } from '../../store/mocks'
import { NotePreview } from '../NotePreview'
import { useNotesList } from '../../hooks'

export function NotePreviewList({ className, ...props }: ComponentProps<'ul'>): JSX.Element {
  const { notes, selectedNoteById, handleNoteSelected } = useNotesList()
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
