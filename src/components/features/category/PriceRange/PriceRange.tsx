'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './PriceRange.module.css'
import { Slider } from 'radix-ui'
import { Filter } from '@/lib/types'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

interface PriceRangeProps {
  range: number[]
  // addOneActiveFilter: (filter: Filter) => void
  // removeOneActiveFilter: (filterId: string) => void
}

export default function PriceRange({ range }: PriceRangeProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  // export default function PriceRange({ range, addOneActiveFilter, removeOneActiveFilter }: PriceRangeProps) {
  const rangeRef = useRef(range)
  const [priceRange, setPriceRange] = useState(range)
  const previousActiveFilterRef = useRef<Filter>(null)

  const handleCommit = () => {
    //-- Prepare the new URL --
    const newURL = new URLSearchParams(searchParams)
    newURL.set('priceRange', priceRange.join(','))

    //-- Update the URL --
    router.push(pathname + '?' + newURL)

    // const displayName = `${priceRange[0]}€ - ${priceRange[1]}€`
    // const activeFilter = { id: crypto.randomUUID(), type: 'priceRange', value: `${priceRange[0]},${priceRange[1]}`, displayName } as Filter
    // const previousActiveFilter = previousActiveFilterRef.current
    // if (previousActiveFilter) removeOneActiveFilter(previousActiveFilter.id)
    // addOneActiveFilter(activeFilter)
    // previousActiveFilterRef.current = activeFilter
  }

  //---------- USE EFFECT ----------//

  return (
    <div className={styles['price-range']}>
      <p className={styles['range']}>{`${priceRange[0]}€ - ${priceRange[1]}€ `}</p>

      <Slider.Root
        className={styles['slider-root']}
        min={rangeRef.current[0]}
        max={rangeRef.current[1]}
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
