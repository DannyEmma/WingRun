'use client'

import { useEffect, useRef, useState } from 'react'
import Swiper from 'swiper'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import styles from './Visualizer.module.css'
import Image from 'next/image'
import { BASE_URL_PRODUCT_IMAGE } from '@/lib/constants'

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
          setZoomIn(false)
        },
        navigationNext(swiper) {
          setZoomIn(false)
        },
      },
      initialSlide: start,
      navigation: {
        addIcons: true,
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
          <path d="M1 1L13 13M13 1L1 13" stroke="#514e49" strokeWidth="1.33333" strokeLinecap="round" />
        </svg>
      </button>

      <div className="swiper">
        <div className="swiper-wrapper">
          {images.map((src, index) => (
            <div key={index} className={`swiper-slide ${styles['visualizer-image-container']}`}>
              <Image
                onClick={() => setZoomIn((prev) => !prev)}
                className={styles['visualizer-image']}
                src={BASE_URL_PRODUCT_IMAGE + src}
                width={2424}
                height={1885}
                alt="Preview Image"
              />
            </div>
          ))}
        </div>
        {/* <button className={styles['prev-button']} type="button" onClick={() => swiper?.slidePrev()} disabled={swiper?.activeIndex === 1}>
          <svg width="5" height="8" viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 7L4 4L1 1" stroke="#686155" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button className={styles['next-button']} type="button" onClick={() => swiper?.slideNext()}>
          <svg width="5" height="8" viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 7L4 4L1 1" stroke="#686155" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button> */}

        <button type="button" className="swiper-button-prev">
          <svg width="5" height="8" viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 7L4 4L1 1" stroke="#686155" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button type="button" className="swiper-button-next">
          <svg width="5" height="8" viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 7L4 4L1 1" stroke="#686155" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  )
}
