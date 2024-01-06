import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Provider from '../redux/provider'
import {Setup} from "@/components/utils";
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Bood',
  description: 'Ешь с умом',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
    <body className={inter.className}>
    <Provider>
      <Setup/>
      {children}
    </Provider></body>
    </html>
  )
}
