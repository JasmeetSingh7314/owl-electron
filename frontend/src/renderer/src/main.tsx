import React from 'react'
import ReactDOM from 'react-dom/client'
import { HeroUIProvider } from '@heroui/react'

import { WalletProvider } from './contexts/WalletConnect.js'

import './index.css'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <WalletProvider>
    <HeroUIProvider>
      <App />
    </HeroUIProvider>
  </WalletProvider>
)
