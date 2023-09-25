import NavbarComponent from '@/components/Navbar'
import React from 'react'
import { HeroViews, ServicesViews, VisionViews } from './(view)'
import TrashViews from './(view)/Trash'
import Footer from '@/components/Footer'

const LandingPages = () => {
  return (
    <main className='overflow-x-hidden'>
        <NavbarComponent/>
        <HeroViews/>
        <VisionViews/>
        <ServicesViews/>
        <TrashViews/>
        <Footer/>
    </main>
  )
}

export default LandingPages