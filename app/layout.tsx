import { Header } from '@/components/header/header'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Provider } from 'react-redux'
import store from '@/store/redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

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
        <Provider store={store}>
          <Header />
          {children}
        </Provider>
        <ToastContainer />
      </body>

    </html >
  )
}
