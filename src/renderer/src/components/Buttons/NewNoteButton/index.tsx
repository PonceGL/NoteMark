import { useSetAtom } from 'jotai'
import { ActionButton } from '../ActionButton'
import { DefaultButtonProps } from '../types'
import { LuFileSignature } from 'react-icons/lu'
import { createEmptyNoteAtom } from '../../../store'

export function NewNoteButton({ ...props }: DefaultButtonProps): JSX.Element {
  const createEmptyNote = useSetAtom(createEmptyNoteAtom)

  const handleCreation = (): void => {
    createEmptyNote()
  }
  return (
    <ActionButton onClick={handleCreation} {...props}>
      <LuFileSignature className="w-4 h-4 text-zinc-300" />
    </ActionButton>
  )
}
