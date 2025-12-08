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
import { service } from '@/lib/services'

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
  const pathname = headersList.get('x-pathname') //-- The x-pathname is set in middleware file --
  const headerTheme = pathname === '/' ? 'transparent' : 'dark' //-- Use to change theme when page is reload --

  const session = (
    await auth.api.getSession({
      headers: headersList,
    })
  )?.session

  const [brands, bestSellers, newArrivals] = await Promise.all([
    service.brand.getAllBrand().then((res) => res.data),
    service.product.getProductsByTag('BEST_SELLER', 5).then((res) => res.data),
    service.product.getProductsByTag('NEW_ARRIVAL', 5).then((res) => res.data),
  ])

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
            success: (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="20" height="20" rx="4" fill="url(#paint0_linear_313_1514)" />
                <path
                  d="M8.76197 12.2539L14.7907 6.21381C14.933 6.07127 15.099 6 15.2886 6C15.4783 6 15.6443 6.07127 15.7866 6.21381C15.9289 6.35635 16 6.52573 16 6.72196C16 6.91819 15.9289 7.08734 15.7866 7.2294L9.25992 13.7862C9.11765 13.9287 8.95166 14 8.76197 14C8.57228 14 8.40629 13.9287 8.26402 13.7862L5.2052 10.7216C5.06293 10.5791 4.99464 10.4099 5.00033 10.2142C5.00602 10.0184 5.08024 9.84903 5.22298 9.70601C5.36573 9.563 5.53479 9.49173 5.73018 9.4922C5.92556 9.49268 6.09439 9.56395 6.23666 9.70601L8.76197 12.2539Z"
                  fill="#F4EFE9"
                />
                <defs>
                  <linearGradient id="paint0_linear_313_1514" x1="10" y1="0" x2="10" y2="20" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#47C896" />
                    <stop offset="1" stop-color="#47BCC4" />
                  </linearGradient>
                </defs>
              </svg>
            ),
          }}
        />

        {/* //-- Use to reset scroll when page change -- */}
        <ResetScrollTop />

        <Header theme={headerTheme as 'dark' | 'light' | 'transparent'} brands={brands} />

        {children}

        <Footer bestSellers={bestSellers} newArrivals={newArrivals} />
      </body>
    </html>
  )
}
