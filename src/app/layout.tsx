import './globals.css'
import styles from './Toast.module.css'
import { Roboto, Oswald } from 'next/font/google'
import type { Metadata } from 'next'
import { headers } from 'next/headers'
import Image from 'next/image'
import { Toaster } from 'sonner'
import { auth } from '@/lib/auth'
import SessionInitializer from '@/components/providers/SessionInitializer/SessionInitializer'
import Header from '@/components/layouts/Header/Header'
import Footer from '@/components/layouts/Footer/Footer'
import ResetScrollTop from '@/components/layouts/ResetScrollTop/ResetScrollTop'

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

interface RootLayoutProps {
  children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const headersList = await headers()

  const session = (
    await auth.api.getSession({
      headers: headersList,
    })
  )?.session

  return (
    <html lang="fr" className={`${roboto.className} ${oswald.variable} `}>
      <body>
        {/* -- Use to keep user session when the page is reload  */}
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

        {/* //-- Use to reset scroll when page change -- */}
        <ResetScrollTop />

        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
