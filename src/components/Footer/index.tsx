import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {FaInstagram} from 'react-icons/fa'
import Navbar from "../Navbar/navbar.json"

const Footer = () => {
  return (
    <footer className='text-white bg-gradient-to-br from-[#119BFF] to-[#5DC7DE]'>
        <div className="flex flex-col gap-5 lg:flex-row items-start text-center justify-between container mx-auto  p-4">
            <div className="">
                <div className='relative min-w-20 h-20'>
                    <Image 
                        src={'/logo-text-white.svg'} 
                        alt=''
                        fill
                        className='object-contain'
                    />
                </div>
                <Link href={''} className="">
                    <p className='flex items-center gap-2'>
                        <span className="text-xl">
                            <FaInstagram/> 
                        </span>
                        <span className='text-sm'>
                            @reblue.innovation
                        </span>
                    </p>
                </Link>
            </div>
            <div className="">
                <h3 className='text-lg font-semibold'>Pintasan</h3>
                <div className='flex flex-col md:items-start'>
                    {Navbar.map((_, i) => {
                        return(
                            <Link href={_.location} key={i} className='text-sm'>
                                {_.content}
                            </Link>
                        )
                    }).slice(0, -1)}
                </div>
            </div>
            <div className="text-left">
                <h3 className='font-semibold'>Email</h3>
                <p className='text-sm'>support@reblue.id</p>
            </div>
        </div>
        <div className="flex justify-center p-4 items-center gap-1 text-sm">
            <span className='text-xl'>©</span> 
            2023 Reblue Indonesia
        </div>
    </footer>
  )
}

export default Footer