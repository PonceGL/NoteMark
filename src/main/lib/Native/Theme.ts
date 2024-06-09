import { nativeTheme } from 'electron/main'
import { ThemeSource } from '../../../shared/types'

export function darkModeToggle(): boolean {
  if (nativeTheme.shouldUseDarkColors) {
    nativeTheme.themeSource = ThemeSource.LIGHT
  } else {
    nativeTheme.themeSource = ThemeSource.DARK
  }

  return nativeTheme.shouldUseDarkColors
}

export function setupSystemTheme(): void {
  nativeTheme.themeSource = ThemeSource.SYSTEM
}
