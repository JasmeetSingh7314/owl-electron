import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, ChevronRight, Info } from 'lucide-react'
import { GameCard } from './GameCard'
import Suggestions from '../Detailpanel/Suggestions'
import { useGetDetails } from '@renderer/hooks/useGetDetails'
import DlcsComp from '../Detailpanel/Dlcs'
import { useCartStore, useWishlistStore } from '@renderer/store/store'
import { toast } from 'sonner'
import axios from 'axios'

interface GameDetailsProps {
  game: Game
  activeTab: 'overview' | 'add-ons' | 'faq'
  onTabChange: (tab: 'overview' | 'add-ons' | 'faq') => void
  onAddToCart: (item: any) => void
}

export const GameDetails = ({ game, activeTab, onTabChange, onAddToCart }: GameDetailsProps) => {
  console.log(game)
  const detailsResponse = useGetDetails(game?.id)
  const { cart, addToCart, removeFromCart } = useCartStore()

  const isInCart = cart.includes(game.id)

  const { wishlist, addToWishlist, removeFromWishlist } = useWishlistStore()
  const isInWishlist = wishlist.includes(game.id)

  //𝘓𝘰𝘨𝘪𝘤 𝘧𝘰𝘳 𝘩𝘢𝘯𝘥𝘭𝘪𝘯𝘨 𝘸𝘪𝘴𝘩𝘭𝘪𝘴𝘵
  const handleWishlist = async () => {
    if (isInWishlist) {
      try {
        toast.error(`${game.name} removed from Wishlist`)
        removeFromWishlist(game?.id)
        const userID = JSON.parse(sessionStorage.getItem('current-user') as string)?.ID
        await axios.delete(`http://localhost:8080/api/wish-list/${userID}`, {
          data: {
            wishList: String(game.id)
          }
        })

        console.log(`${game.id} removed`)
      } catch (error) {
        console.error('API not working!@!')
      }
    }
    try {
      const userID = JSON.parse(sessionStorage.getItem('current-user') as string)?.ID
      toast.success(`${game.name} added to Wishlist`)
      addToWishlist(game.id)
      await axios.put(`http://localhost:8080/api/wish-list/${userID}`, {
        wishList: [String(game.id)]
      })

      console.log(`${game.id} added to wishlist`)
    } catch (error) {
      console.error('API is not working!!')
    }
  }
  const handleCart = async () => {
    if (isInCart) {
      try {
        toast.error(`${game.name} removed from Cart`)
        removeFromCart(game.id)
        const userID = JSON.parse(sessionStorage.getItem('current-user') as string)?.ID
        await axios.delete(`http://localhost:8080/api/wish-list/${userID}`, {
          data: {
            wishList: String(game.id)
          }
        })

        console.log(`${game.id} removed`)
      } catch (error) {
        console.error('API not working!@!')
      }
    }
    try {
      const userID = JSON.parse(sessionStorage.getItem('current-user') as string)?.ID
      toast.success(`${game.name} added to Wishlist`)
      addToCart(game.id)
      await axios.put(`http://localhost:8080/api/cart/${userID}`, {
        cart: [String(game.id)]
      })

      console.log(`${game.id} added to wishlist`)
    } catch (error) {
      console.error('API is not working!!')
    }
  }
  return (
    <div className="flex-1 overflow-y-auto font-urbanist">
      <div className="relative">
        {/* Hero Section */}
        <div className="relative h-[300px] md:h-[300px]">
          <div className="absolute inset-0">
            <img
              src={game?.cover?.url.replace('t_thumb', 't_1080p')}
              alt={game.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/50 to-transparent" />
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-3xl md:text-5xl font-bold font-jura mb-4">{game.name}</h1>
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <span className="ml-1 font-medium">{Math.round(game.rating) || 4.7}</span>
                </div>
                {game.genres?.map((genre, index) => (
                  <FeatureTag key={index}>{genre.name}</FeatureTag>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <section className="flex w-full pr-12">
          <div className="flex-1  mx-auto px-4 md:px-8 py-6">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Main Content */}
              <div className="flex-1/3 w-full lg:w-[900px]">
                <div className="mb-8">
                  <div className="flex flex-1/3 gap-4 mb-6  overflow-x-auto">
                    <TabButton
                      active={activeTab === 'overview'}
                      onClick={() => onTabChange('overview')}
                    >
                      Overview
                    </TabButton>
                    <TabButton
                      active={activeTab === 'add-ons'}
                      onClick={() => onTabChange('add-ons')}
                    >
                      Add-Ons
                    </TabButton>
                    <TabButton active={activeTab === 'faq'} onClick={() => onTabChange('faq')}>
                      FAQ
                    </TabButton>
                  </div>

                  {activeTab === 'overview' && (
                    <>
                      <ImageGallery images={game?.screenshots} />
                      <div className="space-y-8 mt-8">
                        <div className="bg-white/5 backdrop-blur-lg rounded-lg p-6">
                          <h2 className="text-2xl font-jura font-bold mb-4">About {game.name}</h2>
                          <p className="text-gray-300 leading-relaxed">
                            {game.summary ||
                              `Experience an epic adventure in ${game.name}. Join forces with other players in this revolutionary roguelike adventure where every decision matters and every battle counts.`}
                          </p>
                        </div>

                        <div className="bg-white/5 backdrop-blur-lg rounded-lg p-6">
                          <h2 className="text-2xl font-jura font-bold mb-4">System Requirements</h2>
                          <div className="grid md:grid-cols-2 gap-8">
                            <div>
                              <h3 className="text-lg font-medium mb-4  font-jura">Minimum</h3>
                              <dl className="space-y-4">
                                <div>
                                  <dt className="text-gray-400 font-jura">OS</dt>
                                  <dd>Windows 10</dd>
                                </div>
                                <div>
                                  <dt className="text-gray-400 font-jura">Processor</dt>
                                  <dd>Quad Core 2.4Ghz</dd>
                                </div>
                                <div>
                                  <dt className="text-gray-400 font-jura">Memory</dt>
                                  <dd>8 GB RAM</dd>
                                </div>
                              </dl>
                            </div>
                            <div>
                              <h3 className="text-lg font-medium mb-4 font-jura">Recommended</h3>
                              <dl className="space-y-4">
                                <div>
                                  <dt className="text-gray-400 font-jura">OS</dt>
                                  <dd>Windows 10</dd>
                                </div>
                                <div>
                                  <dt className="text-gray-400 font-jura">Processor</dt>
                                  <dd>Quad Core 2.6Ghz</dd>
                                </div>
                                <div>
                                  <dt className="text-gray-400 font-jura">Memory</dt>
                                  <dd>16 GB RAM</dd>
                                </div>
                              </dl>
                            </div>
                          </div>
                        </div>
                        <Suggestions id={game?.id} detailsResponse={detailsResponse} />
                      </div>
                    </>
                  )}

                  {activeTab === 'add-ons' && (
                    <div className="space-y-4">
                      <DlcsComp detailsResponse={detailsResponse} id={game?.id} />
                    </div>
                  )}

                  {activeTab === 'faq' && (
                    <div className="font-jura bg-white/5 backdrop-blur-lg rounded-lg p-6">
                      <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-medium mb-2">
                            When will the game be released?
                          </h3>
                          <p className="text-gray-300">
                            The game is scheduled for release on{' '}
                            {game.releaseDate || 'March 28, 2025'}.
                          </p>
                        </div>
                        <div>
                          <h3 className="text-lg font-medium mb-2">
                            Will there be multiplayer support?
                          </h3>
                          <p className="text-gray-300">
                            Yes, the game will feature both single-player and multiplayer modes.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Sidebar */}
              <div className="flex-2/3 w-full mt-14 lg:w-80">
                <div className="bg-white/5 backdrop-blur-lg rounded-lg p-6 sticky top-4">
                  <img
                    src={game?.cover?.url.replace('t_thumb', 't_1080p')}
                    alt={game.name}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Base Game</span>
                      <span className="text-xl font-bold">${45}</span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      className="w-full py-3 bg-blue-500 rounded-lg font-medium"
                      onClick={() =>
                        onAddToCart({
                          id: 'base-' + game.title.toLowerCase().replace(/\s+/g, '-'),
                          title: game.title,
                          price: game.price,
                          image: game.image,
                          type: 'game'
                        })
                      }
                    >
                      Buy Now
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      className="w-full py-3 bg-white/10 rounded-lg font-medium"
                      onClick={() =>
                        onAddToCart({
                          id: 'base-' + game.title.toLowerCase().replace(/\s+/g, '-'),
                          title: game.title,
                          price: game.price,
                          image: game.image,
                          type: 'game'
                        })
                      }
                    >
                      Add to Cart
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      className="w-full py-3 bg-white/5 rounded-lg font-medium"
                      onClick={() => handleWishlist()}
                    >
                      Add to Wishlist
                    </motion.button>

                    <div className="pt-4 border-t border-white/10">
                      <dl className="space-y-2">
                        <div className="flex justify-between">
                          <dt className="text-gray-400">Developer</dt>
                          <dd>{game.developer || 'Thunder Lotus'}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-gray-400">Publisher</dt>
                          <dd>{game.publisher || 'Thunder Lotus'}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-gray-400">Release Date</dt>
                          <dd>{game.releaseDate || '03/28/25'}</dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
const ImageGallery = ({ images }: { images: any[] }) => {
  if (images.length > 0) {
    const [selectedImage, setSelectedImage] = useState(
      images[0]?.url?.replace('t_thumb', 't_1080p')
    )

    return (
      <div className="relative">
        <div className="aspect-video rounded-lg  overflow-hidden">
          <img src={selectedImage} alt="Game screenshot" className=" object-contain" />
        </div>
        <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
          {images.slice(0, 5).map((img, index) => (
            <motion.div
              key={index}
              className={`w-32 h-20 flex-shrink-0 rounded-md overflow-hidden border-2 transition-all cursor-pointer ${
                selectedImage === img
                  ? 'border-blue-500'
                  : 'border-transparent hover:border-blue-500/50'
              }`}
              onClick={() => setSelectedImage(img?.url?.replace('t_thumb', 't_1080p'))}
            >
              <img
                src={img?.url?.replace('t_thumb', 't_1080p')}
                alt={`Screenshot ${index + 1}`}
                className="w-full h-full  object-cover"
              />
            </motion.div>
          ))}
        </div>
      </div>
    )
  }
  return
}

const TabButton = ({
  active,
  children,
  onClick
}: {
  active: boolean
  children: React.ReactNode
  onClick: () => void
}) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 font-medium transition-colors ${
      active ? 'border-b-2 border-blue-500' : 'text-gray-400 hover:text-white'
    }`}
  >
    {children}
  </button>
)

const FeatureTag = ({ children }: { children: React.ReactNode }) => (
  <span className="px-3 py-1 rounded-full bg-white/5 text-sm">{children}</span>
)
