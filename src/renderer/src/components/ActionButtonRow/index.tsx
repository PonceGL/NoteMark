import { ComponentProps } from 'react'
import { DeleteNoteButton, NewNoteButton } from '../Buttons'
import { NotificationButton } from '../Buttons/NotificationButton'
import { DarkModeToggle } from '../Buttons/DarkModeToggle'

export function ActionButtonRow({ ...props }: ComponentProps<'div'>): JSX.Element {
  return (
    <div {...props}>
      <NewNoteButton />
      <DeleteNoteButton />
      <NotificationButton />
      <DarkModeToggle />
    </div>
  )
}
