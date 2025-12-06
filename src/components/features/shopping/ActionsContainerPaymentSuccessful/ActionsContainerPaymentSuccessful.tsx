import CTA from '@/components/ui/CTA/CTA'
import styles from './ActionsContainerPaymentSuccessful.module.css'

export default function ActionsContainerPaymentSuccessful() {
  return (
    <div className={styles['actions-container']}>
      <CTA variant="primary" href="/account/orders">
        Voir ma commande
      </CTA>
      <CTA variant="secondary" href="/">
        Retour à la boutique
      </CTA>
    </div>
  )
}
