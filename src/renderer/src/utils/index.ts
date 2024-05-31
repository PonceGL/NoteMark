import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

const dateFormatter = new Intl.DateTimeFormat(window.api.locale, {
  dateStyle: 'short',
  timeStyle: 'short',
  timeZone: 'UTC'
})

export function formatDateFromMs(ms: number): string {
  return dateFormatter.format(ms)
}

export const cn = (...args: ClassValue[]): string => {
  return twMerge(clsx(...args))
}
