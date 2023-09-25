"use client"
import React from 'react'
import styles from './navbar.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { RiCloseFill, RiMenu4Fill } from 'react-icons/ri'
import NavItems from './navbar.json'
import { usePathname, useRouter } from 'next/navigation'

const NavbarComponent = () => {
  const router = useRouter()
  const pathname = usePathname()

  const [open, setOpen] = React.useState(false)

  // const getPage = () => {
  //   return "/" + router.asPath.split("/")[1];
  // };

  const handleOpen = () => {
    setOpen(!open)
  }

  return (
    <nav className={styles.nav}>
      <div className="">
        <div className="flex items-center justify-between w-full">
          <div className="relative h-[8vh] md:w-[8vw] w-[25vw] ">
            <Image
              src={'/logo-text.svg'}
              alt='lorem'
              fill
              className='object-contain'
            />
          </div>
          <div onClick={handleOpen} className="text-3xl md:hidden cursor-pointer text-blue-500">
            {open 
              ? 
              <RiCloseFill />
              : 
              <RiMenu4Fill /> 
            }
          </div>
        </div>
        <div className={`${styles.menu}  hidden md:flex items-center whitespace-nowrap`}>
          {
            NavItems.map((_,i,a)=>{
              const last = a.length - 1
              return(
                <Link key={i} href={_.location} >
                    <p key={i} className={`
                      ${last == i && styles['join-btn']} 
                      ${pathname === _.location ? styles.active : `hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-br hover:from-[#119BFF] hover:to-[#5DC7DE]`}
                    `}>
                      {_.content}
                    </p>
                </Link>
              )
            })
          }
          {/* <Link href={'/home'}>Home</Link>
          <Link href={'/about'}>About</Link>
          <Link href={'/services'}>Services</Link>
          <Link href={'/partners'}>Partners</Link>
          <Link href={'/comunity'}>Comunity</Link>
          <Link href={'/contact'}>Contact Us</Link>
          <Link href={'/auth'}>Auth</Link> */}
        </div>
      </div>
      {open &&
        <div className={`${styles.menu} flex flex-col md:hidden pb-2`}>
          {
            NavItems.map((_,i)=>{
              return(
                <Link key={i} href={_.location}>
                  {_.content}
                </Link>
              )
            })
          }
          {/* <Link href={'/login'} >
            Join
          </Link> */}
        </div>
      }
    </nav>
  )
}

export default NavbarComponent