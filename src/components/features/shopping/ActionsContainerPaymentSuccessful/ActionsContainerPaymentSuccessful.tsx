'use client'

import Button from '@/components/ui/Button/Button'
import styles from './ActionsContainerPaymentSuccessful.module.css'
import { useRouter } from 'next/navigation'

export default function ActionsContainerPaymentSuccessful() {
  const router = useRouter()

  return (
    <div className={styles['actions-container']}>
      <Button variant="cta-primary" onClick={() => router.push('/account/orders')}>
        Voir ma commande
      </Button>
      <Button variant="cta-secondary" onClick={() => router.push('/')}>
        Retour à la boutique
      </Button>
    </div>
  )
}
