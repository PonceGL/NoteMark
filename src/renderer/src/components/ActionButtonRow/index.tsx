import { ComponentProps } from 'react'
import { DeleteNoteButton, NewNoteButton } from '../Buttons'

export function ActionButtonRow({ ...props }: ComponentProps<'div'>): JSX.Element {
  return (
    <div {...props}>
      <NewNoteButton />
      <DeleteNoteButton />
    </div>
  )
}
