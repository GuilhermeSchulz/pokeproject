"use client"

import { Header } from '@/components/header/header'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import PokemonContext from '@/context/Context'


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
        <PokemonContext.Provider value={undefined}>
          <Header />
          {children}
        </PokemonContext.Provider>
      </body>

    </html >
  )
}
