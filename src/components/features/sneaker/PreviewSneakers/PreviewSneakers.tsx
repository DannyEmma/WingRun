'use client'

import Image from 'next/image'
import styles from './PreviewSneakers.module.css'
// import VisualizerTemp from '@/components/features/sneaker/VisualizerTemp/Visualizer'
import Visualizer from '@/components/features/sneaker/Visualizer/Visualizer'
import { useEffect, useState } from 'react'
import { BASE_URL_PRODUCT_IMAGE } from '@/lib/constants'

interface PreviewSneakersProps {
  images: string[]
}

export default function PreviewSneakers({ images }: PreviewSneakersProps) {
  const [showVisualizer, setShowVisualizer] = useState(false)
  const [startIndex, setStartIndex] = useState(0)
  //---------- EVENTS HANDLERS ----------//
  const handleVisualizer = (index: number) => {
    setStartIndex(index)
    setShowVisualizer(true)
  }

  useEffect(() => {
    const body = document.querySelector('body')

    if (body) {
      if (showVisualizer) {
        body.style.overflow = 'hidden'
      } else {
        body.style.overflow = 'auto'
      }
    }
  }, [showVisualizer])

  return (
    <div className="preview-sneakers">
      {showVisualizer && <Visualizer images={images} initialSlide={startIndex} setShowVisualizer={setShowVisualizer} />}
      <div className={styles['preview']}>
        <div className={styles['preview-image-container']}>
          <Image
            onClick={() => handleVisualizer(0)}
            className={styles['primary-image']}
            src={BASE_URL_PRODUCT_IMAGE + '/' + images[0]}
            width={2424}
            height={1885}
            alt="Preview Image"
          />
        </div>

        <div className={styles['preview-grid']}>
          {images.map((src, index) => {
            if (index !== 0)
              return (
                <div key={index} className={styles['preview-image-container']}>
                  <Image
                    onClick={() => handleVisualizer(index)}
                    className={styles['image']}
                    src={BASE_URL_PRODUCT_IMAGE + '/' + src}
                    width={2424}
                    height={1885}
                    alt="Preview Image"
                  />
                </div>
              )
          })}
        </div>
      </div>
    </div>
  )
}
