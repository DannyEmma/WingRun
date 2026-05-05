"use client"

import { useEffect, useState } from "react"
import styles from "./PriceRange.module.css"
import { Slider } from "radix-ui"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Filter } from "@/lib/types"

interface PriceRangeProps {
  range: number[]
  activeFilter: Filter | undefined
}

export default function PriceRange({ range, activeFilter }: PriceRangeProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [min, max] = range
  const [priceRange, setPriceRange] = useState(activeFilter?.value.split(",").map(Number) ?? range)

  const handleCommit = () => {
    //-- Prepare the new URL --
    const newURL = new URLSearchParams(searchParams)
    newURL.set("priceRange", priceRange.join(","))

    //-- Update the URL --
    router.push(pathname + "?" + newURL)
  }

  return (
    <div className={styles["price-range"]}>
      <p className={styles["range"]}>{activeFilter?.displayName ?? `${min}€ - ${max}€`}</p>

      <Slider.Root
        className={styles["slider-root"]}
        min={min}
        max={max}
        value={priceRange}
        step={1}
        onValueChange={setPriceRange}
        onValueCommit={handleCommit}
        minStepsBetweenThumbs={10}
      >
        <Slider.Track className={styles["slider-track"]}>
          <Slider.Range className={styles["slider-range"]} />
        </Slider.Track>
        <Slider.Thumb className={styles["slider-thumb"]} />
        <Slider.Thumb className={styles["slider-thumb"]} />
      </Slider.Root>
    </div>
  )
}
