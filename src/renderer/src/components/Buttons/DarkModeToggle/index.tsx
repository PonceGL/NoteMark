import { ActionButton } from '../ActionButton'
import { DefaultButtonProps } from '../types'
import { CgDarkMode } from 'react-icons/cg'

export function DarkModeToggle({ ...props }: DefaultButtonProps): JSX.Element {
  const colorThemeToggle = (): void => {
    window.api.darkModeToggle()
  }
  return (
    <ActionButton onClick={colorThemeToggle} {...props}>
      <CgDarkMode className="w-4 h-4 text-zinc-300" />
    </ActionButton>
  )
}
