import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export function RootLayout({ className, children, ...props }: ComponentProps<'main'>): JSX.Element {
  return (
    <main className={twMerge('h-screen flex flex-row', className)} {...props}>
      {children}
    </main>
  )
}
