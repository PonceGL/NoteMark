import { ComponentProps } from 'react'
import { notesMock } from '../../store/mocks'
import { NotePreview } from '../NotePreview'

export function NotePreviewList({ className, ...props }: ComponentProps<'ul'>): JSX.Element {
  return (
    <ul className={className} {...props}>
      {notesMock.length === 0 ? (
        <p>No Notes Yet!</p>
      ) : (
        <>
          {notesMock.map((note) => (
            <li key={note.id}>
              <NotePreview {...note} />
            </li>
          ))}
        </>
      )}
    </ul>
  )
}
