import './globals.css'
import styles from './Toast.module.css'
import type { Metadata } from 'next'
import { Roboto, Oswald } from 'next/font/google'
import Image from 'next/image'
import Header from '@/components/Header/Header'
import { Toaster } from 'sonner'
import SessionInitializer from '@/components/SessionInitializer/SessionInitializer'

const roboto = Roboto({
  subsets: ['latin'],
})
const oswald = Oswald({
  subsets: ['latin'],
  variable: '--font-oswald',
})

export const metadata: Metadata = {
  title: 'WingRun',
  description: 'Site de sneakers',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${roboto.className} ${oswald.variable} `}>
      <body>
        <Header />
        <SessionInitializer />
        <Toaster
          position="top-right"
          toastOptions={{
            classNames: {
              toast: styles.toast,
              title: styles.title,
              description: styles.description,
            },
            closeButton: true,
            duration: Infinity,
          }}
          icons={{
            success: <Image src={'/icons/success.svg'} width={20} height={20} alt="Success icon" />,
          }}
        />
        {children}
      </body>
    </html>
  )
}
