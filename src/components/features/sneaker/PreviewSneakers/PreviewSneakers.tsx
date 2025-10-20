'use client'

import Image from 'next/image'
import styles from './PreviewSneakers.module.css'
import Visualizer from '@/components/features/sneaker/Visualizer/Visualizer'
import { useEffect, useState } from 'react'

export default function PreviewSneakers() {
  const images = [
    '/images/products/jordan/air-jordan-4/standard/fear/visuals/1.webp',
    '/images/products/jordan/air-jordan-4/standard/fear/visuals/2.webp',
    '/images/products/jordan/air-jordan-4/standard/fear/visuals/3.webp',
    '/images/products/jordan/air-jordan-4/standard/fear/visuals/4.webp',
    '/images/products/jordan/air-jordan-4/standard/fear/visuals/5.webp',
    '/images/products/jordan/air-jordan-4/standard/fear/visuals/6.webp',
    '/images/products/jordan/air-jordan-4/standard/fear/visuals/7.webp',
  ]

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
      {showVisualizer && <Visualizer images={images} start={startIndex} setShowVisualizer={setShowVisualizer} />}
      <div className={styles['preview']}>
        <div className={styles['preview-image-container']}>
          <Image onClick={() => handleVisualizer(0)} className={styles['primary-image']} src={images[0]} width={2424} height={1885} alt="Preview Image" />
        </div>

        <div className={styles['preview-grid']}>
          {images.map((src, index) => (
            <div key={index} className={styles['preview-image-container']}>
              <Image onClick={() => handleVisualizer(index)} src={src} width={2424} height={1885} alt="Preview Image" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
