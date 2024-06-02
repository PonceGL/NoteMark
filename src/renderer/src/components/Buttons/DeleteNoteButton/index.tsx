import { useSetAtom } from 'jotai'
import { ActionButton } from '../ActionButton'
import { DefaultButtonProps } from '../types'
import { FaRegTrashCan } from 'react-icons/fa6'
import { deleteNoteAtom } from '../../../store'

export function DeleteNoteButton({ ...props }: DefaultButtonProps): JSX.Element {
  const deleteNote = useSetAtom(deleteNoteAtom)

  const handleDelete = async (): Promise<void> => {
    await deleteNote()
  }
  return (
    <ActionButton onClick={handleDelete} {...props}>
      <FaRegTrashCan className="w-4 h-4 text-zinc-300" />
    </ActionButton>
  )
}
