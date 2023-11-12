import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { Providers } from './providers'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100','200','300','400','500','600','700','800','900']
})

export const metadata: Metadata = {
  title: 'Reblue',
  description: 'Reblue adalah solusi untuk menjaga kelestarian laut. Mari kita bersama-sama mengurangi sampah dan menyelamatkan laut biru.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
