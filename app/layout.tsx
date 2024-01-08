import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Price Tracker',
  description: 'Price Tracker is a price tracking application that helps you track price changes of your favorite products and get notified when the price drops.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Navbar/>
        {children}
      </body>
    </html>
  )
}
