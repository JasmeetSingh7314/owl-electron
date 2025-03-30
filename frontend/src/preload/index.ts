import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer

const api = {}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.

contextBridge.exposeInMainWorld('electron', {
  minimizeWindow: () => ipcRenderer.invoke('minimize-window'),
  maximizeWindow: () => ipcRenderer.invoke('maximize-window'),
  closeWindow: () => ipcRenderer.invoke('close-window'),
  install: (payload) => ipcRenderer.invoke('install-game', { payload }),
  onMaximizeStateChange: (callback) => {
    ipcRenderer.on('maximize-state-changed', (_, isMaximized) => callback(isMaximized))
    return () => ipcRenderer.removeAllListeners('maximize-state-changed')
  }
})
contextBridge.exposeInMainWorld('api', api)

// } else {
//   // @ts-ignore (define in dts)
//   window.electron = electronAPI
//   // @ts-ignore (define in dts)
//   window.api = api
// }
