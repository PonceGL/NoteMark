export enum ThemeSource {
  LIGHT = 'light',
  DARK = 'dark',
  SYSTEM = 'system'
}
export type DarkModeToggle = () => boolean
export type SetupSystemTheme = () => void
