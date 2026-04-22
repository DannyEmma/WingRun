'use client'

import ActionLink from '@/components/ui/ActionLink/ActionLink'
import { Accordion } from 'radix-ui'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import styles from './FilterPanel.module.css'
import React, { useEffect, useState } from 'react'
import { Filter } from '@/lib/types'

interface FilterPanelProps {
  activeFilters: Filter[]
  brandItems: React.JSX.Element[]
  sizeItems: React.JSX.Element[]
  colorItems: React.JSX.Element[]
  priceItems: React.JSX.Element[]
  adultItems: React.JSX.Element[]
  kidItems: React.JSX.Element[]
}
export default function FilterPanel({ activeFilters, brandItems, sizeItems, colorItems, priceItems, adultItems, kidItems }: FilterPanelProps) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'auto'
  }, [open])

  return (
    <>
      <ActionLink onClick={() => setOpen(true)}>
        <div className={styles['trigger']}>
          Filtres
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-sliders-horizontal-icon lucide-sliders-horizontal"
          >
            <path d="M10 5H3" />
            <path d="M12 19H3" />
            <path d="M14 3v4" />
            <path d="M16 17v4" />
            <path d="M21 12h-9" />
            <path d="M21 19h-5" />
            <path d="M21 5h-7" />
            <path d="M8 10v4" />
            <path d="M8 12H3" />
          </svg>
        </div>
      </ActionLink>

      {open && (
        <div className={styles['panel']}>
          <div className={styles['header']}>
            <p className={styles['title']}>Filtres</p>
            <button type="button" onClick={() => setOpen(false)}>
              <svg className={styles['close-icon']} width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.666992 0.666687L12.667 12.6667M12.667 0.666687L0.666992 12.6667" stroke="#514E49" strokeWidth="1.33333" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className={styles['content']}>
            {/* //---------- BRANDS ----------// */}
            <Accordion.Root type="single" collapsible>
              <Accordion.Item value="item1">
                <Accordion.Header className={styles['accordion-header']}>
                  <Accordion.Trigger className={styles['accordion-trigger']}>
                    Marque
                    <ChevronDownIcon className={styles['accordion-chevron']} aria-hidden />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className={styles['accordion-content']}>
                  {brandItems.map((item, index) => (
                    <React.Fragment key={index}>{item}</React.Fragment>
                  ))}
                </Accordion.Content>
              </Accordion.Item>
            </Accordion.Root>

            {/* //---------- SIZES ----------// */}
            <Accordion.Root type="single" collapsible>
              <Accordion.Item value="item2">
                <Accordion.Header className={styles['accordion-header']}>
                  <Accordion.Trigger className={styles['accordion-trigger']}>
                    Taille
                    <ChevronDownIcon className={styles['accordion-chevron']} aria-hidden />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className={styles['accordion-content']}>
                  {sizeItems.map((item, index) => (
                    <React.Fragment key={index}>{item}</React.Fragment>
                  ))}
                </Accordion.Content>
              </Accordion.Item>
            </Accordion.Root>

            {/* //---------- COLORS----------// */}
            <Accordion.Root type="single" collapsible>
              <Accordion.Item value="item3">
                <Accordion.Header className={styles['accordion-header']}>
                  <Accordion.Trigger className={styles['accordion-trigger']}>
                    Couleur
                    <ChevronDownIcon className={styles['accordion-chevron']} aria-hidden />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className={styles['accordion-content']}>
                  {colorItems.map((item, index) => (
                    <React.Fragment key={index}>{item}</React.Fragment>
                  ))}
                </Accordion.Content>
              </Accordion.Item>
            </Accordion.Root>

            {/* //---------- PRICE ----------// */}
            <Accordion.Root type="single" collapsible>
              <Accordion.Item value="item3">
                <Accordion.Header className={styles['accordion-header']}>
                  <Accordion.Trigger className={styles['accordion-trigger']}>
                    Prix
                    <ChevronDownIcon className={styles['accordion-chevron']} aria-hidden />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className={styles['accordion-content']}>
                  {priceItems.map((item, index) => (
                    <React.Fragment key={index}>{item}</React.Fragment>
                  ))}
                </Accordion.Content>
              </Accordion.Item>
            </Accordion.Root>

            {/* //---------- ADULTS ----------// */}
            {!activeFilters.some((filter) => filter.type === 'kids') && (
              <Accordion.Root type="single" collapsible>
                <Accordion.Item value="item3">
                  <Accordion.Header className={styles['accordion-header']}>
                    <Accordion.Trigger className={styles['accordion-trigger']}>
                      Adulte
                      <ChevronDownIcon className={styles['accordion-chevron']} aria-hidden />
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content className={styles['accordion-content']}>
                    {adultItems.map((item, index) => (
                      <React.Fragment key={index}>{item}</React.Fragment>
                    ))}
                  </Accordion.Content>
                </Accordion.Item>
              </Accordion.Root>
            )}

            {/* //---------- KIDS ----------// */}
            {!activeFilters.some((filter) => filter.type === 'adults') && (
              <Accordion.Root type="single" collapsible>
                <Accordion.Item value="item3">
                  <Accordion.Header className={styles['accordion-header']}>
                    <Accordion.Trigger className={styles['accordion-trigger']}>
                      Enfant
                      <ChevronDownIcon className={styles['accordion-chevron']} aria-hidden />
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content className={styles['accordion-content']}>
                    {kidItems.map((item, index) => (
                      <React.Fragment key={index}>{item}</React.Fragment>
                    ))}
                  </Accordion.Content>
                </Accordion.Item>
              </Accordion.Root>
            )}
          </div>
        </div>
      )}
    </>
  )
}
