'use client'

import Link from 'next/link'
import styles from './Breadcrumb.module.css'
import { usePathname } from 'next/navigation'
import React from 'react'

interface BreadcrumbProps {
  category?: string
  slug?: string
}

export default function Breadcrumb({ category, slug }: BreadcrumbProps) {
  const pathname = usePathname()
  const linksName = pathname.split('/').filter((linkName) => linkName !== '')

  return (
    <div className={styles.breadcrumb}>
      <Link href="/">Accueil</Link>
      <svg width="5" height="8" viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 7L4 4L1 1" stroke="#686155" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      {linksName.map((linkName, index) => (
        <React.Fragment key={index}>
          <Link href="/">{linkName.replaceAll('-', ' ')}</Link>
          {linksName.length - 1 !== index && (
            <svg width="5" height="8" viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 7L4 4L1 1" stroke="#686155" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </React.Fragment>
      ))}
    </div>
  )
}
