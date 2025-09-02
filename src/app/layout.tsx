import './globals.css'
import styles from './Toast.module.css'
import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { Roboto, Oswald } from 'next/font/google'
import Image from 'next/image'
import { Toaster } from 'sonner'
import { auth } from '@/lib/auth'
import UserService from '@/lib/services/user'
import SessionInitializer from '@/components/providers/SessionInitializer/SessionInitializer'
import Header from '@/components/layouts/Header/Header'
import Footer from '@/components/layouts/Footer/Footer'

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = (
    await auth.api.getSession({
      headers: await headers(),
    })
  )?.session

  return (
    <html lang="fr" className={`${roboto.className} ${oswald.variable} `}>
      <body>
        <Header theme="dark" />
        {/* -- Use to keep data when the page is reload  */}
        <SessionInitializer session={session} />
        <Toaster
          position="top-right"
          toastOptions={{
            classNames: {
              toast: styles.toast,
              title: styles.title,
              description: styles.description,
              closeButton: styles['close-button'],
            },
            closeButton: true,
          }}
          icons={{
            success: <Image src={'/icons/success.svg'} width={20} height={20} alt="Success icon" />,
          }}
        />
        {children}
        <Footer />
      </body>
    </html>
  )
}
