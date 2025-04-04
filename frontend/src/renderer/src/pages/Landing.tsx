import { BentoGrid } from '@renderer/components/Home/BentoGrid'
import Carousel from '@renderer/components/Home/Carousel'
import { CTA } from '@renderer/components/Home/CTA'
import Footer from '@renderer/components/Home/Footer'
import { GenreTray } from '@renderer/components/Home/GenreTray'
import HeroBanner from '@renderer/components/Home/HeroBanner'
import { NavbarComp } from '@renderer/components/Navbar'
import { gsap } from 'gsap'
import { useEffect, useRef } from 'react'

import { ScrollTrigger } from 'gsap/all'

function Home() {
  const component = useRef(null)
  gsap.registerPlugin(ScrollTrigger)

  useEffect(() => {
    const ctx = gsap.context(() => {
      let tl = gsap.timeline({
        scrollTrigger: {
          start: 400,
          end: 700,
          scrub: 2
        }
      })
      tl.fromTo(
        '.carousel-temp',
        {
          y: 100,
          scale: 1,
          opacity: 0
        },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.65
        }
      )

      let tl2 = gsap.timeline({
        scrollTrigger: {
          markers: false,
          start: 1080,
          end: 1450,
          scrub: 2
        }
      })

      tl2.fromTo(
        '.bento-grid',
        {
          y: 200,
          scale: 1,
          opacity: 0
        },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.65
        }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <section className="h-max bg-black ">
      <div
        className="px-2 py-4 flex mb-5 justify-center flex-col 2xl:px-36 medium:px-48 extra:px-60"
        ref={component}
      >
        <NavbarComp />
        <HeroBanner />
        <div className="carousel-temp">
          <Carousel />
        </div>
      </div>
      <GenreTray />
      <div className="px-2 flex justify-center flex-col sm:px-60 md:px-20">
        <div className="bento-grid" ref={component}>
          <BentoGrid />
        </div>

        <CTA />
        <Footer />
      </div>
    </section>
  )
}

export default Home
