'use client'

import Link from 'next/link'
import styles from './Breadcrumb.module.css'
import React from 'react'
import { usePathname } from 'next/navigation'

interface BreadcrumbProps {
  items: { label: string; url: string | null }[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const pathname = usePathname()
  console.log(pathname)

  const arrow = (
    <svg width="5" height="8" viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 7L4 4L1 1" stroke="#686155" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )

  return (
    <div className={styles.breadcrumb}>
      {items.map((item, index) => {
        return (
          <React.Fragment key={index}>
            {/* //-- Link or not link -- */}
            {item.url && (
              <Link className={styles.link} href={item.url as string}>
                {item.label}
              </Link>
            )}
            {!item.url && <p>{item.label}</p>}

            {/* //-- Don't show the last arrow -- */}
            {index !== items.length - 1 && arrow}
          </React.Fragment>
        )
      })}
    </div>
  )
}
