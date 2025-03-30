import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'

interface GameCardProps {
  title: string
  index: any
  price: string | null
  image: string
  discount?: string
  releaseDate?: string
  status?: string
  originalPrice?: string
  compact?: boolean
  onClick?: any
}

export const GameCard = ({
  title,
  index,
  price,
  image,
  discount,
  releaseDate,
  status,
  originalPrice,
  compact = false,
  onClick
}: GameCardProps) => {
  if (compact) {
    return (
      <motion.div
        key={index}
        whileHover={{ scale: 1.02 }}
        className="flex items-center gap-4 p-2 rounded-lg hover:bg-white/5 cursor-pointer"
        onClick={onClick}
      >
        <img src={image} alt={title} className="w-16 h-16 rounded-lg object-cover" />
        <div className="flex-1">
          <h3 className="font-medium text-white">{title}</h3>
          <div className="flex items-center gap-2">
            {status && <span className="text-sm text-gray-400">{status}</span>}
            {releaseDate && <span className="text-sm text-gray-400">Available {releaseDate}</span>}
            {price && (
              <div className="flex items-center gap-2">
                {discount && (
                  <>
                    <span className="text-sm line-through text-gray-500">{originalPrice}</span>
                    <span className="bg-blue-500/80 text-xs px-2 py-0.5 rounded">-{discount}%</span>
                  </>
                )}
                <span className="text-sm">{price === 'Free' ? 'Free' : `₹${price}`}</span>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="relative overflow-hidden rounded-lg bg-black/20 backdrop-blur-xl border border-white/5 shadow-xl cursor-pointer"
      onClick={onClick}
    >
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4 bg-gradient-to-t from-black/60 to-transparent backdrop-blur-sm">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="flex items-center gap-2 mt-2">
          {discount && (
            <span className="bg-blue-500/80 backdrop-blur-sm text-xs px-2 py-1 rounded">
              -{discount}%
            </span>
          )}
          {status && <span className="text-sm text-gray-400">{status}</span>}
          {releaseDate ? (
            <span className="text-sm text-gray-400">Available {releaseDate}</span>
          ) : (
            <span className="text-lg">{price}</span>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export const SectionHeader = ({ title }: { title: string }) => (
  <div className="flex items-center justify-between mb-6">
    <div className="flex items-center gap-2">
      <h2 className="text-xl font-bold">{title}</h2>
      <ChevronRight className="w-5 h-5" />
    </div>
  </div>
)
