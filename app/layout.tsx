
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import 'react-toastify/dist/ReactToastify.css';
import RootComponent from '@/components/rootComponent/rootComponent'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PokeProject',
  description: 'Um projeto de Pokedex',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <RootComponent>

          {children}
        </RootComponent>

      </body>

    </html >
  )
}
