'use client'

import { useEffect, useState } from 'react'
import styles from './PriceRange.module.css'
import { Slider } from 'radix-ui'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Filter } from '@/lib/types'

interface PriceRangeProps {
  range: number[]
  activeFilters: Filter[]
}

export default function PriceRange({ range, activeFilters }: PriceRangeProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [min, max] = range

  const [priceRange, setPriceRange] = useState(range)

  const handleCommit = () => {
    //-- Prepare the new URL --
    const newURL = new URLSearchParams(searchParams)
    newURL.set('priceRange', priceRange.join(','))

    //-- Update the URL --
    router.push(pathname + '?' + newURL)
  }

  //---------- USE EFFECT ----------//

  useEffect(() => {
    setPriceRange(range)
  }, [range])

  return (
    <div className={styles['price-range']}>
      <p className={styles['range']}>{activeFilters.filter((filter) => filter.type === 'priceRange')[0].displayName}</p>

      <Slider.Root
        className={styles['slider-root']}
        min={min}
        max={max}
        value={priceRange}
        step={1}
        onValueChange={setPriceRange}
        onValueCommit={handleCommit}
        minStepsBetweenThumbs={10}
      >
        {/* <Slider.Root
        className={styles['slider-root']}
        min={min}
        max={max}
        value={activeFilters
          .filter((filter) => filter.type === 'priceRange')[0]
          .value.split(',')
          .map(Number)}
        step={1}
        onValueChange={setPriceRange}
        onValueCommit={handleCommit}
        minStepsBetweenThumbs={10}
      > */}
        <Slider.Track className={styles['slider-track']}>
          <Slider.Range className={styles['slider-range']} />
        </Slider.Track>
        <Slider.Thumb className={styles['slider-thumb']} />
        <Slider.Thumb className={styles['slider-thumb']} />
      </Slider.Root>
    </div>
  )
}
