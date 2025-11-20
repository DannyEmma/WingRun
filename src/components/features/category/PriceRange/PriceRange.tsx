'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './PriceRange.module.css'
import { Slider } from 'radix-ui'
import { Filter } from '@/lib/types'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

interface PriceRangeProps {
  range: number[]
}

export default function PriceRange({ range }: PriceRangeProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  // const rangeRef = useRef(range)
  const [min, max] = range

  const [priceRange, setPriceRange] = useState(range)
  console.log('range', range)
  console.log('priceRange', priceRange)

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
      <p className={styles['range']}>{`${priceRange[0]}€ - ${priceRange[1]}€ `}</p>

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
        <Slider.Track className={styles['slider-track']}>
          <Slider.Range className={styles['slider-range']} />
        </Slider.Track>
        <Slider.Thumb className={styles['slider-thumb']} />
        <Slider.Thumb className={styles['slider-thumb']} />
      </Slider.Root>
    </div>
  )
}
