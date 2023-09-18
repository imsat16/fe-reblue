import NavbarComponent from '@/components/Navbar'
import Image from 'next/image'
import React from 'react'

const LandingPages = () => {
  return (
    <>
        <NavbarComponent/>
        <section className='h-screen bg-gradient-to-br from-[#119BFF] to-[#5DC7DE] flex items-center justify-between'>
            <div className='text-white px-10 inline-flex flex-col gap-9 '>
                <h1 className='leading-[64px] text-[64px] font-bold'>Cleanliness is part of faith</h1>
                <div className="">
                    <button className="bg-white p-2 rounded-full">
                        <p className='text-transparent font-semibold bg-clip-text bg-gradient-to-br from-[#119BFF] to-[#5DC7DE]'>
                            Pick up Trash
                        </p>
                    </button>
                </div>
                <div>
                    <span className="text-white text-xl font-semibold leading-tight">Want to learn more? </span>
                    <span className="text-white text-xl font-bold font-['Poppins'] leading-tight">Explore further</span>
                    <span className="text-white text-xl font-semibold leading-tight">!</span>
                </div>
            </div>
            <div className="relative h-full w-full flex">
                <Image alt="x" fill className='object-cover' src={'/thumbr.png'}/>
            </div>
        </section>
        <section className='h-screen flex items-center container mx-auto'>
            <div className="flex gap-10 w-full">
                <div className="w-6/12 ">
                    <div className="w-full h-[350px] relative">
                        <Image alt='sdd' fill className="w-full h-full rounded-2xl" src="https://via.placeholder.com/500x350" />
                    </div>
                </div>
                <div className="flex flex-col p-4 gap-6">
                    <div className="w-[454px] text-sky-500 text-[40px] font-bold leading-10">Lorem ipsum dolor sit amet, consectetur adipiscing elit,</div>
                    <div className="w-[454px] text-sky-500 text-base font-medium leading-none">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
                </div>
            </div>
        </section>
    </>
  )
}

export default LandingPages