import { app, BrowserWindow, Menu, Tray } from 'electron'

import path from 'path'
import { getAssetPath } from './pathResolver'

export function createTray(mainWindow: BrowserWindow) {
  const tray = new Tray(path.join(getAssetPath(), 'owltray.png'))
  tray.setContextMenu(
    Menu.buildFromTemplate([
      {
        label: 'Open Owl',
        click: () => {
          mainWindow.show()
          if (app.dock) {
            app.dock.show()
          }
        }
      },
      {
        label: 'Close Owl',
        click: app.quit
      }
    ])
  )
}
