import { ActionButton } from '../ActionButton'
import { DefaultButtonProps } from '../types'
import { LuFileSignature } from 'react-icons/lu'

export function NewNoteButton({ ...props }: DefaultButtonProps): JSX.Element {
  return (
    <ActionButton {...props}>
      <LuFileSignature className="w-4 h-4 text-zinc-300" />
    </ActionButton>
  )
}
