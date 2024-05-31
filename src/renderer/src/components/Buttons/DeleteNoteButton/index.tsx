import { ActionButton } from '../ActionButton'
import { DefaultButtonProps } from '../types'
import { FaRegTrashCan } from 'react-icons/fa6'

export function DeleteNoteButton({ ...props }: DefaultButtonProps): JSX.Element {
  return (
    <ActionButton {...props}>
      <FaRegTrashCan className="w-4 h-4 text-zinc-300" />
    </ActionButton>
  )
}
