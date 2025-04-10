import Footer from "@renderer/components/Home/Footer";
import Banner from '@renderer/components/Marketplace/Banner'
import { GameBento } from '@renderer/components/Marketplace/GameBento'
import GameGrid from '@renderer/components/Marketplace/GameGrid'
import SideBar from '@renderer/components/Marketplace/Sidebar'
import { SkeletonGrid } from '@renderer/components/Marketplace/SkeletonGrid'

import { NavbarComp } from '@renderer/components/Navbar'
import { Suspense } from "react";

export default function MarketPlace() {
  return (
    <section>
      <div className="px-2 py-4 flex justify-between flex-col 2xl:px-36 medium:px-48 extra:px-60 ">
        <NavbarComp />

          <Banner />
          <GameBento />


        <div className="flex gap-20 h-full mt-20">
          <SideBar />
          <Suspense fallback={<SkeletonGrid />}>
            <GameGrid />
          </Suspense>
        </div>
        <Footer />
      </div>
    </section>
  );
}
