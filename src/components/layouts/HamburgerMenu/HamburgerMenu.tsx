'use client'

import { useEffect, useState } from 'react'
import styles from './HamburgerMenu.module.css'
import Link from 'next/link'

export default function HamburgerMenu() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    open ? (document.body.style.overflow = 'hidden') : (document.body.style.overflow = 'auto')
  }, [open])

  return (
    <div className={styles['hamburger-menu']}>
      {/* //---------- TRIGGER ----------// */}
      <button type="button" className={styles['trigger']} onClick={() => setOpen(true)}>
        <svg
          className={styles['hamburger-icon']}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 5h16" />
          <path d="M4 12h16" />
          <path d="M4 19h16" />
        </svg>
      </button>

      {/* //---------- MENU ----------// */}
      {open && (
        <div className={styles['menu']}>
          <button type="button" onClick={() => setOpen(false)}>
            <svg className={styles['close-icon']} width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.666992 0.666687L12.667 12.6667M12.667 0.666687L0.666992 12.6667" stroke="#514E49" strokeWidth="1.33333" strokeLinecap="round" />
            </svg>
          </button>

          <nav className={styles['nav-links-mobile']}>
            <ul className={styles['links']}>
              <li onClick={() => setOpen(false)}>
                <Link href="collections?tag=NEW_ARRIVAL">nouveautés</Link>
              </li>
              <li onClick={() => setOpen(false)}>
                <Link href="/collections?adults=MEN">hommes</Link>
              </li>
              <li onClick={() => setOpen(false)}>
                <Link href="/collections?adults=WOMEN">femmes</Link>
              </li>
              <li onClick={() => setOpen(false)}>
                <Link href="/collections?kids=BOY,GIRL">enfants</Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  )
}
