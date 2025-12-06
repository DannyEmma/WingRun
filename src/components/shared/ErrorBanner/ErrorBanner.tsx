import { useEffect, useState } from 'react'
import styles from './ErrorBanner.module.css'
import { util } from '@/lib/utils'

export default function ErrorBanner({ code }: { code: string | null | undefined }) {
  const [show, setShow] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (code) {
      setMessage(util.error.displayErrorMessage(code))
      setShow(true)
    } else {
      setMessage('')
      setShow(false)
    }
  }, [code])

  return <div className={`${styles['error-banner']} ${show && styles.show}`}>{message}</div>
}
