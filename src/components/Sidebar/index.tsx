"use client"
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import {AiOutlineHistory, AiFillMessage} from "react-icons/ai"
import {BsSend} from "react-icons/bs"

const Sidebar = () => {
  const pathname = usePathname()

  return (
    <aside className='hidden lg:flex flex-col gap-3 flex-1 min-w-[20vw] max-w-[20vw] h-screen bg-white p-4 sticky top-0'>
      <Link href={'/profile'} className="flex bg-gradient-to-br from-[#119BFF] to-[#5DC7DE] text-white py-[10px] p-3 rounded-xl">
        <div className="flex items-center gap-3">
          <div className="relative w-[60px] h-[60px] bg-black/40 rounded-full">
            <Image
              src={'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
              alt=''
              fill
              className='rounded-full w-full h-full aspect-square'
            />
          </div>
          <div className="">
            <div className="text-xl font-medium">John doe</div>
            <div className="text-sm font-light opacity-70">Beginer</div>
          </div>
        </div>
        <div className="">

        </div>
      </Link>
      <Link href={'/home'}>
        <p className={`${pathname === '/home' ? 'bg-gradient-to-br from-[#119BFF] to-[#5DC7DE] text-white' : 'text-black/60'} flex items-center gap-2 p-3 rounded-lg`}>
          <span className='text-2xl'>
            <BsSend/>
          </span>
          <span>
            Kirim Sampah
          </span>
        </p>
      </Link>
      <Link href={'/history'}>
        <p className={`${pathname === '/history' ? 'bg-gradient-to-br from-[#119BFF] to-[#5DC7DE] text-white' : 'text-black/60'} flex items-center gap-2 p-3 rounded-lg`}>
          <span className='text-2xl'>
            <AiOutlineHistory/>
          </span>
          <span>
            Riwayat
          </span>
        </p>
      </Link>
      <Link href={'/message'}>
        <p className={`${pathname === '/message' ? 'bg-gradient-to-br from-[#119BFF] to-[#5DC7DE] text-white' : 'text-black/60'} flex items-center gap-2 p-3 rounded-lg`}>
          <span className='text-2xl'>
            <AiFillMessage/>
          </span>
          <span>
            Pesan
          </span>
        </p>
      </Link>
    </aside>
  )
}

export default Sidebar