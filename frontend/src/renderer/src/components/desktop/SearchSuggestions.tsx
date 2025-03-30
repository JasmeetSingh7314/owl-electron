import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Gamepad2, Clock, Star } from 'lucide-react'

import { useQuery } from '@tanstack/react-query'

interface SearchSuggestionsProps {
  isVisible: boolean
  searchTerm: string
  onGameClick: (game: any) => void
}

export const SearchSuggestions = ({
  isVisible,
  searchTerm,
  onGameClick
}: SearchSuggestionsProps) => {
  // Mock data - in a real app, this would be filtered based on searchTerm
  const [searchResult, setSearchResult] = useState<any[]>([])
  const recentSearches = ["Assassin's Creed", 'Grand Theft Auto V', 'Fortnite']

  const { data } = useQuery({
    queryKey: ['game-query']
  })

  const popularGames = [
    {
      title: "Assassin's Creed Shadows",
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80',
      price: '₹4,899'
    },
    {
      title: '33 Immortals',
      image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80',
      price: '₹719'
    }
  ]

  const categories = ['Action', 'Adventure', 'RPG', 'Strategy']

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchTerm) {
        const filteredData = data?.filter((element: Game) =>
          element?.name?.toLowerCase()?.includes(searchTerm.toLowerCase())
        )
        setSearchResult(filteredData)
      }
    }, 500)
    return () => clearTimeout(debounceTimer)
  }, [searchTerm])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute right-0 left-0 mt-2 bg-black backdrop-blur-xl font-urbanist rounded-lg border border-white/10 shadow-xl"
        >
          <div className="p-4">
            {searchTerm &&
              searchResult.map((game) => (
                <div
                  className="flex items-center gap-2 mb-4 p-2 hover:bg-white/5 rounded-lg cursor-pointer"
                  onClick={() => onGameClick(game)}
                >
                  <div
                    key={game.id}
                    className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg cursor-pointer"
                  >
                    <img
                      src={game.cover?.url}
                      alt={game.name}
                      className="w-10 h-10 rounded object-cover"
                    />
                    <div>
                      <p className="font-medium">{game.name}</p>
                    </div>
                  </div>
                </div>
              ))}
            {!searchTerm && (
              <div className="mb-4">
                <h3 className="text-sm text-gray-400 mb-2">Recent Searches</h3>
                <div className="space-y-2">
                  {recentSearches.map((search, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-2 hover:bg-white/5 rounded-lg cursor-pointer"
                    >
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span>{search}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <h3 className="text-sm text-gray-400 mb-2">Categories</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map((category, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 p-2 hover:bg-white/5 rounded-lg cursor-pointer"
                      >
                        <Gamepad2 className="w-4 h-4 text-gray-400" />
                        <span>{category}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Popular Games */}
            {/* <div className="mb-4">
              <h3 className="text-sm text-gray-400 mb-2">Popular Games</h3>
              <div className="space-y-2">
                {popularGames.map((game, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg cursor-pointer"
                  >
                    <img
                      src={game.image}
                      alt={game.title}
                      className="w-10 h-10 rounded object-cover"
                    />
                    <div>
                      <p className="font-medium">{game.title}</p>
                      <p className="text-sm text-gray-400">{game.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div> */}

            {/* Categories */}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
