import Image from 'next/image'
import React from 'react'

const HeroViews = () => {
  return (
    <section id='' className='h-screen bg-gradient-to-br from-[#119BFF] to-[#5DC7DE] flex items-center justify-between'>
            <div className='text-white px-4 md:px-10 inline-flex flex-col gap-9 '>
                <h1 className='leading-[64px] text-[8vh] md:text-[10vh] font-semibold'>Cleanliness is part of faith</h1>
                {/* <div className="">
                    <button className="bg-white p-2 rounded-full">
                        <p className='text-transparent font-semibold bg-clip-text bg-gradient-to-br from-[#119BFF] to-[#5DC7DE]'>
                            Pick up Trash
                        </p>
                    </button>
                </div> */}
                <div className='text-white text-xl'>
                    <span className=" font-medium leading-tight">Want to learn more? </span>
                    <span className=" font-semibold leading-tight">Explore further !</span>
                </div>
            </div>
            <div className="hidden md:flex relative h-full w-full">
                <Image alt="x" fill className='object-contain bg-blend-screen pt-4 scale-x-[-1]' src={'/not.png'}/>
            </div>
        </section>
  )
}

export default HeroViews