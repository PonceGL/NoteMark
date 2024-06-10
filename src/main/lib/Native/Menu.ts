// https://www.electronjs.org/docs/latest/api/menu-item#menuitemaccelerator
import { is } from '@electron-toolkit/utils'
import { Menu, MenuItem } from 'electron'

const menu = new Menu()

menu.append(
  new MenuItem({
    label: 'NoteMark',
    submenu: [
      {
        role: 'about'
      },
      {
        role: 'hide',
        accelerator: process.platform === 'darwin' ? 'Cmd+H' : 'Ctrl+H'
      },
      {
        role: 'hideOthers',
        accelerator: process.platform === 'darwin' ? 'Cmd+Option+H' : 'Ctrl+Alt+H'
      },
      {
        role: 'quit',
        accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Ctrl+Shift+Q',
        toolTip: 'Cerrar NoteMark'
      }
    ]
  })
)

menu.append(
  new MenuItem({
    label: 'Editar',
    submenu: [
      { role: 'undo', label: 'Deshacer' },
      { role: 'redo', label: 'Rehacer' },
      { type: 'separator' },
      { role: 'selectAll', label: 'Seleccionar todo' },
      { role: 'cut', label: 'Cortar' },
      { role: 'copy', label: 'Copiar' },
      { role: 'paste', label: 'Pegar' }
    ]
  })
)

menu.append(
  new MenuItem({
    label: 'Ver',
    submenu: [
      {
        role: 'help',
        accelerator: process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Alt+Shift+I',
        click: () => {
          console.log('Electron rocks!')
        }
      },
      {
        role: 'reload',
        accelerator: process.platform === 'darwin' ? 'Cmd+R' : 'Ctrl+R'
      },
      {
        role: 'forceReload',
        accelerator: process.platform === 'darwin' ? 'Cmd+Shift+R' : 'Ctrl+Shift+R'
      },
      {
        role: 'togglefullscreen'
      }
    ]
  })
)
if (is.dev) {
  menu.append(
    new MenuItem({
      label: 'Desarrollo',
      submenu: [
        {
          role: 'toggleDevTools',
          accelerator: process.platform === 'darwin' ? 'Cmd+Alt+I' : 'Ctrl+Shift+I'
        }
      ]
    })
  )
}

export const customMenu = menu
