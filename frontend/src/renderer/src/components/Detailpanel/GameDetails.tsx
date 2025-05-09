import { toast } from 'sonner'
import { useWishlistStore, useCartStore } from '@renderer/store/store'
import axios from 'axios'
import { CarouselPlugin } from './DetailCarousel'
import timeConverter from '../../utils/unixTimeConvert'
import { Button } from '@heroui/react'
import { RiSubtractFill } from 'react-icons/ri'
import { CiViewList } from 'react-icons/ci'
import { v4 as uuidv4 } from 'uuid'

type dataType = {
  id: string
  name: string
  screenshots: [
    {
      id: number
      url: string
    }
  ]
  cover: {
    id: number
    url: string
  }
  videos: number[]
  summary: string
  release_dates: [
    {
      date: number
      id: number
    }
  ]
  rating: number
  genres: [
    {
      id: number
      name: string
    }
  ]
}

export default function GameDetails({ data, video }: { data: dataType; video: string[] }) {
  const { cart, addToCart, removeFromCart } = useCartStore()
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlistStore()
  const isInCart = cart.includes(data.id)
  const isInWishlist = wishlist.includes(data.id)

  const handleWishlist = async () => {
    if (isInWishlist) {
      try {
        toast.error(`${data.name} removed from Wishlist`)
        removeFromWishlist(data.id)
        const userID = JSON.parse(sessionStorage.getItem('current-user') as string)?.ID
        await axios.delete(`http://localhost:8080/api/wish-list/${userID}`, {
          data: {
            wishList: String(data.id)
          }
        })

        console.log(`${data.id} removed`)
      } catch (error) {
        console.error('API not working!@!')
      }
    } else {
      try {
        const userID = JSON.parse(sessionStorage.getItem('current-user') as string)?.ID
        toast.success(`${data.name} added to Wishlist`)
        addToWishlist(data.id)
        await axios.put(`http://localhost:8080/api/wish-list/${userID}`, {
          wishList: [String(data.id)]
        })

        console.log(`${data.id} added to wishlist`)
      } catch (error) {
        console.error('API is not working!!')
      }
    }
  }

  // const handleMinting = async () => {
  //   const bodyLicense = {
  //     amount: Math.floor(Math.random() * 20 + 2),
  //     assetName: data.id.toString(),
  //     image: data.cover.url,
  //     license: uuidv4(),
  //     user: sessionStorage.getItem("secretKey")?.toString(),
  //     userAddress: sessionStorage.getItem("publicKey")?.toString(),
  //   };
  //   console.log(bodyLicense);
  //   const response = await axios
  //     .post("http://localhost:3001/mint", bodyLicense)
  //     .then((result) => {
  //       console.log(result.data);
  //       if (response.data.status == 200) {
  //         toast.success(`${data.name} is succesfully minted!`);
  //       } else {
  //         toast.success(`purchase failed`);
  //       }
  //       return result.data;
  //     });
  // };

  const handleMinting = async () => {
    const myPromise = new Promise(async (resolve, reject) => {
      try {
        const bodyLicense = {
          amount: Math.floor(Math.random() * 20 + 2),
          assetName: data.id.toString(),
          image: data.cover.url,
          license: uuidv4(),
          user: sessionStorage.getItem('secretKey')?.toString(),
          userAddress: sessionStorage.getItem('publicKey')?.toString()
        }
        console.log(bodyLicense)

        const response = await axios.post('http://localhost:3001/mint', bodyLicense)

        console.log(response)

        if (response.status === 200) {
          resolve(response.data)
        } else {
          reject(new Error('Purchase failed'))
        }
      } catch (error) {
        reject(error)
      }
    })

    toast.promise(myPromise, {
      loading: 'Minting...',
      success: () => `${data.name} is successfully minted!`,
      error: 'Error'
    })
  }

  return (
    <section className="overflow-hidden md:min-w-l">
      <div></div>
      <div className="flex flex-col md:px-40 px-2">
        <h1 className="flex justify-start font-bold leading-none tracking-tighter mb-4 md:mb-8 col-span-2">
          <span className="ml-2.5 text-nowrap text-6xl bg-gradient-to-r from-blue-500 to-blue-900 text-clip text-transparent bg-clip-text font-weight-900 tracking-wider mb-2 md:mb-4 text-left col-span-4">
            {data?.name}
            <hr className="text-white font-extrabold mt-2 md:mt-4 w-full" />
          </span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-2 gap-y-2">
          <div className="col-span-3 pr-12 flex flex-wrap items-center object-cover">
            <CarouselPlugin array={data?.screenshots} link={video} />
          </div>
          <div className="rounded-md bg-[rgba(255,255,255,0.05)] p-1 bg-opacity-50 opacity-80 hover:opacity-95 font-inter md:col-span-1 lg:col-span-1 transition-all ease-in">
            <img
              src={data?.cover?.url.replace('thumb', 'screenshot_med')}
              alt="Cover Photo"
              className="object-cover aspect-video rounded-t-sm md:col-span-1 lg:col-span-1 w-full h-[285px]"
            />

            <div className="mt-2 px-4">
              <p className="flex items-start w-full leading-relaxed text-dm font-weight-600 tracking-wide mt-3 mb-3">
                <span className="line-clamp-3 font-semibold text-sm font-jura text-left">
                  {data?.summary}
                </span>
              </p>

              <p className="flex items-start w-full leading-relaxed text-dm font-weight-600 tracking-wide mt-2 mb-2">
                <span className="text-violet-400 text-sm tracking-wider">Release Date:</span>
                <span className="line-clamp-3 text-sm text-left px-2">
                  {timeConverter(data?.release_dates[0].date)}
                </span>
              </p>

              <p className="flex items-start w-full leading-relaxed text-dm font-weight-600 tracking-wide mt-2 mb-2">
                <span className="text-violet-400 text-sm tracking-wider">Rating:</span>
                <span className="line-clamp-3 text-sm text-left px-2">
                  {Math.round(data?.rating)}
                </span>
              </p>

              <p className="flex items-start w-full leading-relaxed text-dm font-weight-600 tracking-wide mt-2 mb-2 ">
                <span className="text-violet-400 text-sm tracking-wider">Tags:</span>
                <span className="text-sm text-left px-2">
                  {data?.genres.map((genre) => genre.name).join(', ')}
                </span>
              </p>
              <div className="flex flex-row">
                <Button
                  type="button"
                  onClick={handleMinting}
                  className="flex w-9/12 items-center mt-4 rounded-sm bg-black text-sm font-semibold text-white"
                >
                  Buy
                  {/* {isInCart ? (
                    <>
                      Remove from Cart{" "}
                      <RiSubtractFill className="text-3xl text-blue-400" />
                    </>
                  ) : (
                    <>Buy </>
                  )} */}
                </Button>
                <Button
                  type="button"
                  onClick={handleWishlist}
                  className="flex items-center mt-4 w-3/12 ml-3 rounded-sm min-w-8 bg-black text-sm font-semibold text-white"
                >
                  {isInWishlist ? (
                    <>
                      <RiSubtractFill className="text-3xl text-blue-400" />
                    </>
                  ) : (
                    <>
                      <CiViewList className="text-green-400 text-2xl font-extrabold" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className="text-white font-extrabold mt-4 w-full" />
    </section>
  )
}
