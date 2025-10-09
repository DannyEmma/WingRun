import { useRef, useState } from 'react'
import styles from './PriceRange.module.css'
import { Slider } from 'radix-ui'

interface PriceRangeProps {
  addOneActiveFilter: (filter: string) => void
  removeOneActiveFilter: (filter: string) => void
}

export default function PriceRange({ addOneActiveFilter, removeOneActiveFilter }: PriceRangeProps) {
  const [priceRange, setPriceRange] = useState([80, 200])
  const previousActiveFilterRef = useRef('')

  const handleCommit = () => {
    const activeFilter = `${priceRange[0]}€ - ${priceRange[1]}€`
    const previousActiveFilter = previousActiveFilterRef.current

    if (previousActiveFilter) removeOneActiveFilter(previousActiveFilter)
    addOneActiveFilter(activeFilter)

    previousActiveFilterRef.current = activeFilter
  }

  return (
    <div className={styles['price-range']}>
      <p className={styles['range']}>{`${priceRange[0]}€ - ${priceRange[1]}€ `}</p>

      <Slider.Root
        className={styles['slider-root']}
        min={20}
        max={300}
        value={priceRange}
        step={1}
        onValueChange={setPriceRange}
        onValueCommit={handleCommit}
        minStepsBetweenThumbs={50}
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
