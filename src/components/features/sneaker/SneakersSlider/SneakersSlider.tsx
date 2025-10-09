'use client'

import styles from './SneakersSlider.module.css'
import { useEffect } from 'react'
import Swiper from 'swiper'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

//-- Custom swiper css --
import './SneakerSlider.css'

import SneakerItem from '@/components/features/sneaker/SneakerItem/SneakerItem'
import Button from '@/components/ui/Button/Button'

export default function SneakersSlider({ title, sneakers }: { title: string; sneakers: any[] }) {
  useEffect(() => {
    const swiper = new Swiper('.swiper', {
      slidesPerView: 'auto',
      spaceBetween: 48,
      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      // configure Swiper to use modules
      modules: [Navigation],
    })
  }, [])

  return (
    <div className={'sneakers-slider-container'}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <Button variant="link">Voir tout</Button>
      </div>
      {/* <!-- Slider main container --> */}
      <div className="swiper">
        {/* <!-- Additional required wrapper --> */}
        <div className="swiper-wrapper">
          {/* <!-- Slides --> */}
          {sneakers.map((sneaker, index) => (
            <SneakerItem key={index} sneaker={sneaker} className="swiper-slide" />
          ))}
        </div>

        {/* <!-- If we need navigation buttons --> */}
        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>
      </div>
    </div>
  )
}
