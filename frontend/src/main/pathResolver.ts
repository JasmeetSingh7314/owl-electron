import { app } from 'electron'
import path from 'path'
import { isDev } from './utils'

export function getAssetPath() {
  return path.join(app.getAppPath(), isDev() ? '.' : '..', 'src/assets')
}
