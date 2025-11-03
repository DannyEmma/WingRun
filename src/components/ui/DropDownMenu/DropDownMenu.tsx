'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './DropDownMenu.module.css'

interface DropDownMenu {
  title: string
  data: React.ReactElement[]
  isHovered?: boolean
}

export default function DropDownMenu({ title, data, isHovered }: DropDownMenu) {
  const dropDownMenuRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    //-- Close drop down menu when user click outside --
    const handleClickOutside = (event: PointerEvent) => {
      if (dropDownMenuRef.current && !dropDownMenuRef.current.contains(event.target as Node)) setOpen(false)
    }

    document.addEventListener('click', handleClickOutside)

    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  return (
    <div ref={dropDownMenuRef} className={styles['drop-down-menu']}>
      <div className={styles['trigger']} onClick={() => setOpen((prev) => !prev)}>
        <p className={styles['title']}>{title}</p>

        <svg className={styles['arrow']} width="9" height="12" viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 7L4 4L1 1" stroke="#514e49" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <div className={`${styles['menu-content']} ${open ? styles['show'] : ''}`}>
        <ul>
          {data.map((element, index) => {
            return (
              <li className={isHovered ? styles['hovered'] : ''} key={index}>
                {element}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
