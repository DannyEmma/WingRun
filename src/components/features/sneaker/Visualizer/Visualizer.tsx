'use client'

import { useEffect, useRef, useState } from 'react'
import Swiper from 'swiper'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import styles from './Visualizer.module.css'
import Image from 'next/image'

interface VisualizerProps {
  images: string[]
  start: number
  setShowVisualizer: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Visualizer({ images, start, setShowVisualizer }: VisualizerProps) {
  const visualizerRef = useRef<HTMLDivElement | null>(null)
  const [zoomIn, setZoomIn] = useState(false)
  const [swiper, setSwiper] = useState<Swiper | null>(null)

  const handleZoom = (swiper: Swiper) => {
    console.log('---------------- handleZoom -----------------')

    const visualizer = visualizerRef.current
    const currentSlide = swiper?.slides[swiper?.activeIndex].querySelector('img')

    if (visualizer && currentSlide) {
      if (zoomIn) {
        visualizer.style.setProperty('--visualizer-margin', '0px')
        currentSlide.style.cursor = 'zoom-out'
      } else {
        visualizer.style.setProperty('--visualizer-margin', '96px')
        currentSlide.style.cursor = 'zoom-in'
      }
    }
  }

  useEffect(() => {
    const swiperInstance = new Swiper('.swiper', {
      on: {
        navigationPrev(swiper) {
          console.log('navigationPrev')
          setZoomIn(false)
        },
        navigationNext(swiper) {
          console.log('navigationNext')
          setZoomIn(false)
        },
      },
      initialSlide: start,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      // configure Swiper to use modules
      modules: [Navigation],
    })

    setSwiper(swiperInstance)
  }, [])

  useEffect(() => {
    handleZoom(swiper as Swiper)
  }, [zoomIn])

  //---------- EVENTS HANDLERS ----------//
  const handleClose = () => {
    setShowVisualizer(false)
  }

  return (
    <div ref={visualizerRef} className={styles['visualizer-container']}>
      <button type="button" onClick={handleClose} className={styles['cross-button']}>
        <svg width="16" height="16" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L13 13M13 1L1 13" stroke="#f4efe9" strokeWidth="1.33333" strokeLinecap="round" />
        </svg>
      </button>

      <div className="swiper">
        <div className="swiper-wrapper">
          {images.map((src, index) => (
            <div key={index} className={`swiper-slide ${styles['visualizer-image-container']}`}>
              <Image onClick={() => setZoomIn((prev) => !prev)} className={styles['visualizer-image']} src={src} width={2424} height={1885} alt="Preview Image" />
            </div>
          ))}
        </div>

        <div className={`swiper-button-prev ${styles['prev-button']}`}></div>
        <div className={`swiper-button-next ${styles['next-button']}`}></div>
      </div>
    </div>
  )
}
