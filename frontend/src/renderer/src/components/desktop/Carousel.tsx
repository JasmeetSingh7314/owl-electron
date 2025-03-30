import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'

import { Skeleton } from '../ui/skeleton'
import gsap from 'gsap'

export const Carousel = () => {
  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  const { data, isLoading }: any = useQuery({
    queryKey: ['game-query']
  })
  // let carouselItems = data?.splice(0, 10)

  useEffect(() => {
    if (!autoplay) return
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % 5)
    }, 5000)
    return () => clearInterval(timer)
  }, [autoplay])

  const next = () => {
    setAutoplay(false)
    setCurrent((prev) => (prev + 1) % 5)
  }

  const prev = () => {
    setAutoplay(false)
    setCurrent((prev) => (prev - 1 + 5) % 5)
  }
  // cover?.url?.replace('t_thumb', 't_1080p')
  return (
    <div className="relative w-full h-[500px] overflow-hidden rounded-xl">
      {isLoading ? (
        <Skeleton className="w-full h-[500px] " />
      ) : (
        <section>
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <img
                src={data[current]?.screenshots[
                  Math.round(gsap.utils.random(0, data[current]?.screenshots?.length))
                ]?.url?.replace('t_thumb', 't_1080p')}
                alt="image"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h2 className="text-4xl font-bold mb-4 font-jura">{data[current]?.name}</h2>
                  <p className="text-lg mb-4">{}</p>
                  <div className="flex items-center gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="bg-white text-black px-6 py-2 rounded-lg font-semibold"
                    >
                      Buy Now {2}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="px-6 py-2 rounded-lg font-semibold border border-white/50 hover:bg-white/10"
                    >
                      Add to Wishlist
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {[...Array(5)].map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setAutoplay(false)
                  setCurrent(index)
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === current ? 'bg-white w-4' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
