'use client'

import styles from './Header.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { useUserStore } from '@/lib/stores/user.store'
import { useEffect } from 'react'
import authClient from '@/lib/auth-client'

export default function Header({ theme = 'light' }: { theme?: 'light' | 'dark' }) {
  const session = useUserStore((state) => state.session)
  const headerTheme = theme === 'light' ? styles['light-header'] : styles['dark-header']
  const logoPath = theme === 'light' ? '/dark-logo.svg' : '/light-logo.svg'
  const searchPath = theme === 'light' ? '/icons/dark-search.svg' : '/icons/light-search.svg'
  const accountPath = theme === 'light' ? '/icons/dark-account.svg' : '/icons/light-account.svg'
  const cartPath = theme === 'light' ? '/icons/dark-cart.svg' : '/icons/light-cart.svg'

  // const handleSignOut = async () => {
  //   await authClient.signOut()
  // }

  return (
    <header className={`${styles.header} ${headerTheme}`}>
      <Link href="/">
        <Image className={styles.logo} src={logoPath} width={120} height={25} alt="logo" />
      </Link>

      <nav>
        <ul className={styles.links}>
          <li>
            <Link href="/">nouveautés</Link>
          </li>
          <li>
            <Link href="/">hommes</Link>
          </li>
          <li>
            <Link href="/">femmes</Link>
          </li>
          <li>
            <Link href="/">enfants</Link>
          </li>
        </ul>

        <ul className={styles.icons}>
          <li>
            <Link href="/" title="Barre de recherche">
              <Image src={searchPath} width={18} height={18} alt="Search icon" />
            </Link>
          </li>
          <li>
            <Link href={session ? '/account' : '/login'} title="Compte utilisateur">
              <Image src={accountPath} width={18} height={18} alt="Account icon" />
            </Link>
          </li>
          <li>
            <Link href="/" title="Panier">
              <Image src={cartPath} width={18} height={18} alt="Cart icon" />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
