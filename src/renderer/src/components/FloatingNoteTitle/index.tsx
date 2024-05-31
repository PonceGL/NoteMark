import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export function FloatingNoteTitle({ className, ...props }: ComponentProps<'div'>): JSX.Element {
  const title = 'Hello world'
  return (
    <div className={twMerge('flex justify-center', className)} {...props}>
      <p className="text-gray-400">{title}</p>
    </div>
  )
}
