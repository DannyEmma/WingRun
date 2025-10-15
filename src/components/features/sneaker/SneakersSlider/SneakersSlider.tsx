'use client'

import styles from './SneakersSlider.module.css'
import { useEffect, useRef, useState } from 'react'
import Swiper from 'swiper'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

//-- Custom swiper css --
import './SneakerSlider.css'

import SneakerItem from '@/components/features/sneaker/SneakerItem/SneakerItem'
import Button from '@/components/ui/Button/Button'

export default function SneakersSlider({ title, sneakers }: { title: string; sneakers: any[] }) {
  // const swiperRef = useRef(null)
  const [showSlider, setShowSlider] = useState(false)

  useEffect(() => {
    const swiper = new Swiper('.swiper', {
      slidesPerView: 5.5,
      spaceBetween: 32,
      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      // configure Swiper to use modules
      modules: [Navigation],
      on: {
        init() {
          setShowSlider(true)
        },
      },
    })
  }, [])

  return (
    <div className="swiper-slider-container">
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <Button variant="link">Voir tout</Button>
      </div>

      <div className={`${'swiper'} ${styles.swiper} ${!showSlider && styles['hide-slider']}`}>
        <div className="swiper-wrapper">
          {/* //-- Slides -- */}
          {sneakers.map((sneaker, index) => (
            <div key={index} className={`${'swiper-slide'}`}>
              <SneakerItem sneaker={sneaker} />
            </div>
          ))}
        </div>

        {/* <!-- If we need navigation buttons --> */}
        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>
      </div>
    </div>
  )
}
