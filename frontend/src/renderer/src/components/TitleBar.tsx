import { useState, useEffect } from 'react'

export default function TitleBar() {
  const [isMaximized, setIsMaximized] = useState(false)

  const message = 'Game is installing!'
  const file = 'file'
  //@ts-ignore
  const handleDownload = () => window.electron.install({ message: message, gameFile: file })
  //@ts-ignore
  const handleMinimize = () => window.electron?.minimizeWindow()
  //@ts-ignore
  const handleMaximize = () => window.electron?.maximizeWindow()
  //@ts-ignore
  const handleClose = () => window.electron?.closeWindow()

  return (
    <div
      id="title-bar"
      className="fixed bg-black mb-8 top-0 left-0 right-0 h-10  flex justify-between items-center px-4 z-[100]"
      style={{ WebkitAppRegion: 'drag' }}
    >
      <div className="text-white text-sm font-jura font-bold uppercase">Owl</div>
      <div className="flex space-x-2" style={{ WebkitAppRegion: 'no-drag' }}>
        <button
          className="title-bar-button w-6 h-6 flex items-center justify-center hover:bg-gray-700 rounded text-2xl"
          onClick={() => handleMinimize()}
        >
          <span className="text-white">−</span>
        </button>
        <button
          className="title-bar-button w-6 h-6 flex items-center justify-center hover:bg-gray-700 rounded"
          onClick={() => handleMaximize()}
        >
          <span className="text-white">{isMaximized ? '🗗' : '🗖'}</span>
        </button>
        <button
          className="title-bar-button w-6 h-6 flex items-center justify-center hover:bg-red-500 rounded"
          onClick={() => handleClose()}
        >
          <span className="text-white text-2xl">×</span>
        </button>
        {/* <button
          className="title-bar-button w-6 h-6 flex items-center justify-center hover:bg-red-500 rounded"
          onClick={() => handleDownload()}
        >
          <span className="text-white text-2xl">D</span>
        </button> */}
      </div>
    </div>
  )
}
