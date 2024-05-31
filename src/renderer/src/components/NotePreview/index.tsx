import { ComponentProps } from 'react'
import { NotePreviewType } from './types'
import { cn, formatDateFromMs } from '../../utils'

type NotePreviewProps = NotePreviewType & ComponentProps<'div'>

export function NotePreview({
  title,
  lastEditTime,
  isActive = false,
  className,
  ...props
}: NotePreviewProps): JSX.Element {
  return (
    <div
      className={cn(
        'cursor-pointer px-2.5 py-3 rounded-md transition-colors duration-200',
        {
          'bg-zinc-400/75': isActive,
          'hover:bg-zinc-500/75': !isActive
        },
        className
      )}
      {...props}
    >
      <h3 className="mb-1 font-bold truncate">{title}</h3>
      <span className="w-full inline-block mb-2 text-xs font-light text-left">
        {formatDateFromMs(lastEditTime)}
      </span>
    </div>
  )
}
