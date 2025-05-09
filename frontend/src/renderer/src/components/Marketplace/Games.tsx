import timeConverter from '@renderer/utils/unixTimeConvert'
import { useNavigate } from 'react-router-dom'
import { RiSubtractFill } from 'react-icons/ri'
import { toast } from 'sonner'
import { Button } from '@heroui/react'
import { CiViewList } from 'react-icons/ci'
import { useCartStore, useWishlistStore } from '@renderer/store/store'
import { MdShoppingCart } from 'react-icons/md'
import axios from 'axios'
import { useState } from 'react'
import gsap from 'gsap'
export type GameProps = {
  id: number
  index: string
  url: string
  name: string
  rating: number
  releaseDate: number
  summary: string
  genres: string
  className: string
  handleMinting: any
  handleSelling: any
  isSale: boolean
  issuerAddress: string
  onClick: any
  gameData: any
}

export default function Games({
  index,
  url,
  name,
  gameData,
  summary,
  className,
  isSale,
  issuerAddress,
}: GameProps) {
  const navigate = useNavigate()
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlistStore()
  const isInWishlist = wishlist.includes(index)
  const [userID, setUserID] = useState('')
  const userString = sessionStorage.getItem('current-user')

  const handleWishlist = async () => {
    if (isInWishlist) {
      try {
        toast.error(`${name} removed from Wishlist`)
        removeFromWishlist(index)
        const user = JSON.parse(sessionStorage.getItem('current-user'))
        const userID = user?.ID

        await axios.delete(`http://localhost:8080/api/wish-list/${userID}`, {
          data: {
            wishList: String(index)
          }
        })

        console.log(`${index} removed`)
      } catch (error) {
        console.error('API not working!@!')
      }
    } else {
      try {
        addToWishlist(index)
        console.log('sssss')
        const user = JSON.parse(sessionStorage.getItem('current-user'))
        const userID = user?.ID
        console.log(userID)

        await axios.put(`http://localhost:8080/api/wish-list/${userID}`, {
          wishList: [String(index)]
        })
        toast.success(`${name} added to Wishlist`)
        console.log(`${index} added to wishlist`)
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div
      key={index}
      className={`${className} justify-between cursor-pointer divide-y-2 divide-[gray]/25 hover:bg-gray-600/25 hover:drop-shadow-[0_35px_35px_rgba(255,255,255,0.15)] opacity-75 hover:opacity-100 delay-75  transition-all ease-in-out pb-12 `}
    >
      <img
        src={url?.replace('thumb', '1080p')}
        alt="Laptop"
        className="w-full h-96 rounded-t-md object-cover"
      />
      <div className="p-5 font-inter">
        <p className="line-clamp-2 text-lg font-semibold font-jura">{name}</p>
        <p className="mt-3 text-sm line-clamp-2 text-white">{summary}</p>
        {isSale ? (
          <div>
            <p className="mt-3 flex justify-between text-sm text-white line-clamp-3">
              <span className="text-violet-400">
                Address:<span className="text-white">{issuerAddress}</span>
              </span>
            </p>
          </div>
        ) : (
          <div>
            {/* <p className="mt-3 flex justify-between text-sm text-white">
              <span className="text-violet-400">Rating:</span>
              {Math.round(rating)}
            </p> */}
            <p className="mt-3 flex justify-between  text-white text-md ml-2 ">
              <span className="text-violet-400">Price:</span>
              {'$' + Math.round(gsap.utils.random(0, 60))}
            </p>
          </div>
        )}

        {/* <p className="mt-3 text-left text-sm text-white">
          {genres
            ?.split(', ')
            .slice(0, 2)
            .map((genres, index) => (
              <span
                key={index}
                className="mb-2 mr-2 rounded-full inline-flex bg-gray-100 px-2 py-1 text-[9px] font-semibold text-gray-900"
              >
                {genres}
              </span>
            ))}
        </p> */}
        <div className="flex flex-row">
          {/* <Button
            type="button"
            onClick={() => {
              isSale
                ? handleSelling({
                    name: name,
                    id: index
                  })
                : handleMinting({
                    price: Math.floor(Math.random() * 20 + 2),
                    name: name,
                    image: url,
                    id: index
                  })
            }}
            className="mt-4 w-8/12 justify-center rounded-sm bg-slate-300/25 text-xs font-semibold text-white"
          >
            Buy
          </Button>

          <Button
            type="button"
            onClick={handleWishlist}
            className="flex mt-4 w-4/12 mx-1 min-w-6 rounded-sm bg-slate-300/25 text-sm font-semibold text-white"
          >
            {isInWishlist ? (
              <>
                <RiSubtractFill className="text-blue-500 text-3xl font-extrabold" />
              </>
            ) : (
              <>
                <CiViewList className="text-green-400 text-2xl font-extrabold" />
              </>
            )}
          </Button> */}
        </div>
      </div>
    </div>
  )
}
