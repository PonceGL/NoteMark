import { useAtomValue } from 'jotai'
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'
import { selectedNoteAtom } from '../../store'

export function FloatingNoteTitle({ className, ...props }: ComponentProps<'div'>): JSX.Element {
  const selectedNote = useAtomValue(selectedNoteAtom)
  return (
    <div className={twMerge('flex justify-center', className)} {...props}>
      <p className="text-gray-400">{selectedNote ? selectedNote.title : 'NoteMark'}</p>
    </div>
  )
}
