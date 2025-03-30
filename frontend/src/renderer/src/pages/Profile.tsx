import { NavbarComp } from '@renderer/components/Navbar'

import Orders from '@renderer/components/profile/Orders'

import ProfileHeader from '@renderer/components/profile/ProfileHeader'
import Sidebar from '@renderer/components/profile/Sidebar'
import Stats from '@renderer/components/profile/Stats'
import Wishlist from '@renderer/components/profile/Wishlist'
import Inventory from '@renderer/components/profile/Inventory'

import { useSidebarStore } from '@renderer/store/store'

import Footer from '@renderer/components/Home/Footer'

export default function Profile() {
  const { buttonIndex }: any = useSidebarStore()

  // console.log(address);

  return (
    <main className="px-2 py-4 flex mb-5 justify-around flex-col 2xl:px-36 medium:px-48 extra:px-60 ">
      <NavbarComp />
      <section className="grid grid-cols-5 px-12">
        <div className="col-span-1">
          <Sidebar />
        </div>
        <div className="col-span-4">
          {buttonIndex == 5 ||
          buttonIndex === 4 ||
          buttonIndex === 3 ||
          buttonIndex === 2 ||
          buttonIndex === 1 ? (
            <div></div>
          ) : (
            <ProfileHeader />
          )}
          {switch_Index(buttonIndex)}
          {/* <OwnedGames /> */}
        </div>
      </section>
      <section className="justify-end">
        <Footer />
      </section>
    </main>
  )
}

function switch_Index(index: number) {
  switch (index) {
    case 0:
      return <Stats />
    case 1:
      return <div></div>
    case 2:
      return <Orders />
    case 3:
      return <Wishlist />
    // case 4:
    //   return <DrawerDialog />;
    case 4:
      return <Inventory />
  }
}
