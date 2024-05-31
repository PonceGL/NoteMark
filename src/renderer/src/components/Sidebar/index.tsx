import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export function Sidebar({ className, children, ...props }: ComponentProps<'aside'>): JSX.Element {
  return (
    <aside
      className={twMerge('w-[250px] h-[100vh + 10px] mt-10 overflow-auto', className)}
      {...props}
    >
      {children}
    </aside>
  )
}
