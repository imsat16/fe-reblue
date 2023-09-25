import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['200','400','600','800']
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
        {children}
      </body>
    </html>
  )
}
