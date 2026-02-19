import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar'
import Cursor from './components/Cursor'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Portfolio | Desarrollador Full Stack',
  description: 'Portfolio profesional con animaciones espectaculares',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Cursor />
        <Navbar />
        <main className="relative">
          {children}
        </main>
      </body>
    </html>
  )
}