import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Grid, List, Filter } from 'lucide-react'
import { GameCard } from './GameCard'
import { useWishlistStore } from '@renderer/store/store'
import { getRecommendations } from '@renderer/api/games/getRecommendations'

interface LibraryProps {
  onGameClick: (game: any) => void
}

export const Library = ({ onGameClick }: LibraryProps) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('alphabetical')
  const [activeTab, setActiveTab] = useState<'all' | 'installed' | 'wishlist'>('all')
  const [wishlistGames, setWishlistGames] = useState<any[]>()
  const installedGames = [
    {
      title: 'Among Us',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80',
      status: 'Installed'
    },
    {
      title: 'Fortnite',
      image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80',
      status: 'Installed'
    }
  ]
  useEffect(() => {
    const getGameData = async () => {
      try {
        const data = await getRecommendations(wishlist)
        console.log(data)
        setWishlistGames(data)
      } catch (err) {
        console.log(err)
      }
    }
    getGameData()
  }, [])
  const { wishlist } = useWishlistStore()
  console.log(wishlist)

  const wishlistedGames = wishlist
  const getGames = () => {
    switch (activeTab) {
      case 'installed':
        return installedGames
      case 'wishlist':
        return wishlistGames
      default:
        return [...installedGames, ...wishlistedGames]
    }
  }

  return (
    <div className="flex-1 h-screen overflow-y-auto p-6 font-urbanist">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold">Library</h1>
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-white/10' : 'hover:bg-white/10'}`}
            onClick={() => setViewMode('grid')}
          >
            <Grid className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-white/10' : 'hover:bg-white/10'}`}
            onClick={() => setViewMode('list')}
          >
            <List className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        {['all', 'installed', 'wishlist'].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === tab ? 'bg-white/10' : 'hover:bg-white/5'
            }`}
            onClick={() => setActiveTab(tab as typeof activeTab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search library"
            className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="bg-white/5 border text-white border-white/10 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="alphabetical" className="text-black">
            Alphabetical A-Z
          </option>
          <option value="recent" className="text-black">
            Recently Played
          </option>
          <option value="size" className="text-black">
            Size
          </option>
        </select>
        <motion.button whileHover={{ scale: 1.05 }} className="p-2 rounded-lg hover:bg-white/10">
          <Filter className="w-5 h-5" />
        </motion.button>
      </div>

      <div
        className={
          viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6' : 'space-y-4'
        }
      >
        {getGames()?.map((game) => (
          <GameCard
            key={game?.id}
            index={game?.id}
            compact={viewMode === 'list'}
            title={game?.name}
            image={game?.cover?.url.replace('t_thumb', 't_1080p')}
            onClick={() => {
              onGameClick(game)
              console.log('Triggered')
            }}
          />
        ))}
      </div>
    </div>
  )
}

// import { useState } from 'react'
// import { motion } from 'framer-motion'
// import { Search, Grid, List, Filter } from 'lucide-react'
// import { GameCard } from './GameCard'
// import { useQuery } from '@tanstack/react-query'

// export const Library = () => {
//   const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
//   const [sortBy, setSortBy] = useState('alphabetical')
//   const { data }: any = useQuery({
//     queryKey: ['game-query']
//   })

//   console.log('The game data is :', data)
//   const installedGames = [
//     {
//       title: 'Among Us',
//       image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80',
//       status: 'Installed'
//     },
//     {
//       title: 'Fortnite',
//       image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80',
//       status: 'Installed'
//     },
//     {
//       title: 'Ghostwire Tokyo',
//       image:
//         'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80',
//       status: 'Ready to Install'
//     },
//     {
//       title: 'Grand Theft Auto V',
//       image:
//         'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80',
//       status: 'Installed'
//     }
//   ]

//   return (
//     <div className="flex-1 overflow-y-auto p-6">
//       <div className="flex items-center justify-between mb-8">
//         <h1 className="text-4xl font-bold">Library</h1>
//         <div className="flex items-center gap-4">
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-white/10' : 'hover:bg-white/10'}`}
//             onClick={() => setViewMode('grid')}
//           >
//             <Grid className="w-5 h-5" />
//           </motion.button>
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-white/10' : 'hover:bg-white/10'}`}
//             onClick={() => setViewMode('list')}
//           >
//             <List className="w-5 h-5" />
//           </motion.button>
//         </div>
//       </div>

//       <div className="flex items-center gap-4 mb-6">
//         <div className="flex-1 relative">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search library"
//             className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <select
//           value={sortBy}
//           onChange={(e) => setSortBy(e.target.value)}
//           className="bg-white/5 border text-black border-white/10 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           <option value="alphabetical">Alphabetical A-Z</option>
//           <option value="recent">Recently Played</option>
//           <option value="size">Size</option>
//         </select>
//         <motion.button whileHover={{ scale: 1.05 }} className="p-2 rounded-lg hover:bg-white/10">
//           <Filter className="w-5 h-5" />
//         </motion.button>
//       </div>

//       <div
//         className={
//           viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6' : 'space-y-4'
//         }
//       >
//         {installedGames?.map((game) => (
//           <GameCard
//             key={game.title}
//             index={2}
//             price={2}
//             image={game.image}
//             title={game.title}
//             compact={viewMode === 'list'}
//           />
//         ))}
//         {/* {installedGames?.map((game) => (
//           <GameCard
//             key={game.id}
//             image={game.cover.url?.replace('t_thumb', 't_1080p')}
//             title={game.name}
//             price={2}
//             compact={viewMode === 'list'}
//           />
//         ))} */}
//       </div>
//     </div>
//   )
// }
