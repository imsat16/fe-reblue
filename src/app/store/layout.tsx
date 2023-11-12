import NavbarComponent from '@/components/Navbar'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Reblue',
  description: 'Reblue adalah solusi untuk menjaga kelestarian laut. Mari kita bersama-sama mengurangi sampah dan menyelamatkan laut biru.',
}

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className='pt-[10vh]'>
      <NavbarComponent/>
        {children}
    </section>
  )
}
