import { Search, Heart, ShoppingCart, User, Bell } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { SearchSuggestions } from './SearchSuggestions'

interface HeaderProps {
  onGameClick: () => void
  onProfileClick: () => void
  onCartClick: () => void
  cartItemCount: number
}

export const Header = ({
  onGameClick,
  onProfileClick,
  onCartClick,
  cartItemCount
}: HeaderProps) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="flex fixed top-10 right-0 left-60 z-40  items-center bg-[#121212]/45 justify-between p-4 backdrop-blur-md">
      <div className="flex items-center gap-8 flex-[1/3] lg:flex-1">
        <div className="relative flex-1 max-w-md" ref={searchRef}>
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search store"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <SearchSuggestions
            onGameClick={onGameClick}
            isVisible={showSuggestions}
            searchTerm={searchTerm}
          />
        </div>

        <nav className="flex gap-6">
          {['Discover', 'Browse', 'News'].map((item) => (
            <motion.a
              key={item}
              whileHover={{ scale: 1.05 }}
              className="text-sm hover:text-white cursor-pointer"
            >
              {item}
            </motion.a>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <motion.button whileHover={{ scale: 1.05 }} className="p-2 rounded-full hover:bg-white/10">
          <Heart className="w-5 h-5" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="p-2 rounded-full hover:bg-white/10 relative"
          onClick={onCartClick}
        >
          <ShoppingCart className="w-5 h-5" />
          {cartItemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-blue-500 text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {cartItemCount}
            </span>
          )}
        </motion.button>
        <motion.button whileHover={{ scale: 1.05 }} className="p-2 rounded-full hover:bg-white/10">
          <Bell className="w-5 h-5" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="p-2 rounded-full hover:bg-white/10"
          onClick={onProfileClick}
        >
          <User className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  )
}
