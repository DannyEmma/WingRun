'use client'

import { useState } from 'react'
import styles from './ProductGridOverlay.module.css'

export default function ProductGridOverlay() {
  const [loading, setLoading] = useState(false)

  return <div className={`${styles['overlay']} ${loading && styles['show']}`}></div>
}
