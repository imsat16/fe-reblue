import React from 'react'
import styles from './navbar.module.css'
import Link from 'next/link'

const NavbarComponent = () => {
  return (
    <nav className={styles.nav}>
        <div className="">
            <div className="">Logo</div>
            <div className={styles.menu}>
                <Link href={'/home'}>Home</Link>
                <Link href={'/about'}>About</Link>
                <Link href={'/services'}>Services</Link>
                <Link href={'/partners'}>Partners</Link>
                <Link href={'/comunity'}>Comunity</Link>
                <Link href={'/contact'}>Contact Us</Link>
                <Link href={'/auth'}>Auth</Link>
            </div>
        </div>
    </nav>
  )
}

export default NavbarComponent