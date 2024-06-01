import { useRef } from 'react'

interface ResetScrollReturn {
  ref: React.RefObject<HTMLDivElement>
  resetScroll: () => void
}

export function useResetScroll(): ResetScrollReturn {
  const contentContainerRef = useRef<HTMLDivElement>(null)

  const resetScroll = (): void => {
    if (contentContainerRef.current) {
      contentContainerRef.current?.scrollTo(0, 0)
    }
  }

  return {
    ref: contentContainerRef,
    resetScroll
  }
}
