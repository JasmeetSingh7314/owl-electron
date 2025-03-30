import React, { useState } from 'react'
import { Sidebar } from '@renderer/components/desktop/Sidebar'
import { Header } from '@renderer/components/desktop/Header'
import { MainContent } from '@renderer/components/desktop/MainContent'
import { Library } from '@renderer/components/desktop/Library'
import { Profile } from '@renderer/components/desktop/Profile'
import { useQuery } from '@tanstack/react-query'
import { GameDetails } from '@renderer/components/desktop/GameDetails'
import { Cart } from '@renderer/components/desktop/Cart'
import TitleBar from '@renderer/components/TitleBar'
export type View = 'store' | 'library' | 'profile' | 'game-details'
export interface CartItem {
  id: string
  title: string
  price: string
  image: string
  type: 'game' | 'dlc'
}

const Home = () => {
  const [currentView, setCurrentView] = useState<View>('store')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [selectedGame, setSelectedGame] = useState<any>(null)
  const [cartOpen, setCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [activeTab, setActiveTab] = useState<'overview' | 'add-ons' | 'faq'>('overview')
  console.log(selectedGame)
  const handleGameClick = (game: any) => {
    setSelectedGame(game)
    setCurrentView('game-details')
  }

  const handleAddToCart = (item: CartItem) => {
    setCartItems([...cartItems, item])
    setCartOpen(true)
  }

  const handleRemoveFromCart = (itemId: string) => {
    setCartItems(cartItems.filter((item) => item.id !== itemId))
  }

  const handleViewChange = (view: View) => {
    setCurrentView(view)
    setSidebarOpen(true)
  }
  const { data } = useQuery({
    queryKey: ['game-query']
  })

  return (
    <div className=" overflow-y-auto scrollbar-none flex h-fit bg-[#121212] text-white relative">
      <TitleBar />

      <div className="absolute inset-0 pointer-events-none">
        <div className="w-full h-full bg-gradient-radial from-gray-800/20 via-transparent to-transparent animate-pulse" />
      </div>

      <Sidebar isOpen={sidebarOpen} currentView={currentView} onViewChange={handleViewChange} />
      <div className=" flex-1 flex flex-col ">
        <Header
          onGameClick={handleGameClick}
          onProfileClick={() => handleViewChange('profile')}
          onCartClick={() => setCartOpen(true)}
          cartItemCount={cartItems.length}
        />
        <div className="pt-28 pl-64 pr-12 bg-[#1A1A1A]">
          {currentView === 'store' && <MainContent data={data} onGameClick={handleGameClick} />}
          {currentView === 'library' && <Library onGameClick={handleGameClick} />}
          {currentView === 'profile' && <Profile />}
          {currentView === 'game-details' && selectedGame && (
            <GameDetails
              game={selectedGame}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              onAddToCart={handleAddToCart}
            />
          )}
        </div>

        <Cart
          isOpen={cartOpen}
          onClose={() => setCartOpen(false)}
          items={cartItems}
          onRemoveItem={handleRemoveFromCart}
        />
      </div>
    </div>
  )
}

export default Home
//  <div className="flex h-fit bg-[#121212] text-white font-urbanist">
//       <Sidebar isOpen={sidebarOpen} currentView={currentView} onViewChange={handleViewChange} />
//       <div className="flex-1 flex flex-col">
//         <Header onProfileClick={() => handleViewChange('profile')} />
//         {currentView === 'store' && <MainContent data={data} />}
//         {currentView === 'library' && <Library />}
//         {currentView === 'profile' && <Profile />}
//         {currentView === 'game-details' && selectedGame && (
//           <GameDetails
//             game={selectedGame}
//             activeTab={activeTab}
//             onTabChange={setActiveTab}
//             onAddToCart={handleAddToCart}
//           />
//         )}
//         <Cart
//           isOpen={cartOpen}
//           onClose={() => setCartOpen(false)}
//           items={cartItems}
//           onRemoveItem={handleRemoveFromCart}
//         />
//       </div>
//     </div>
