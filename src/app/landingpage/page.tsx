import NavbarComponent from '@/components/Navbar'
import Image from 'next/image'
import React from 'react'

const LandingPages = () => {
  return (
    <main className='overflow-x-hidden'>
        <NavbarComponent/>
        <section className='h-screen bg-gradient-to-br from-[#119BFF] to-[#5DC7DE] flex items-center justify-between'>
            <div className='text-white px-10 inline-flex flex-col gap-9 '>
                <h1 className='leading-[64px] text-[8vh] md:text-[10vh] font-bold'>Cleanliness is part of faith</h1>
                <div className="">
                    <button className="bg-white p-2 rounded-full">
                        <p className='text-transparent font-semibold bg-clip-text bg-gradient-to-br from-[#119BFF] to-[#5DC7DE]'>
                            Pick up Trash
                        </p>
                    </button>
                </div>
                <div className='text-white text-xl'>
                    <span className=" font-semibold leading-tight">Want to learn more? </span>
                    <span className=" font-bold font-['Poppins'] leading-tight">Explore further</span>
                    <span className=" font-semibold leading-tight">!</span>
                </div>
            </div>
            <div className="hidden md:flex relative h-full w-full">
                <Image alt="x" fill className='object-cover' src={'/thumbr.png'}/>
            </div>
        </section>
        <section className='min-h-screen flex px-4 items-center container mx-auto'>
            <div className="flex gap-10 w-full md:flex-row flex-col">
                <div className="md:w-1/2 ">
                    <div className="w-full h-[35vh] md:h-[350px] relative">
                        <Image alt='sdd' fill className="w-full h-full rounded-2xl object-cover" src="/thumb1.jpg" />
                    </div>
                </div>
                <div className="flex md:w-1/2  flex-col p-4 gap-6 text-sky-500">
                    <div className="text-[4vh] md:text-[6vh] font-bold leading-10">Lorem ipsum dolor sit amet, consectetur adipiscing elit,</div>
                    <div className="text-base font-medium leading-none">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
                </div>
            </div>
        </section>
    </main>
  )
}

export default LandingPages