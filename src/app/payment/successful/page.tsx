import { notFound } from 'next/navigation'
import styles from './PaymentSuccessfulPage.module.css'
import ActionsContainerPaymentSuccessful from '@/components/features/shopping/ActionsContainerPaymentSuccessful/ActionsContainerPaymentSuccessful'
import { stripe } from '@/lib/stripe'
import ResetCart from '@/components/providers/ResetCart/ResetCart'
import { util } from '@/lib/utils'

interface PaymentSuccessfulPageProps {
  searchParams: any
}

export default async function PaymentSuccessfulPage({ searchParams }: PaymentSuccessfulPageProps) {
  const { sessionId } = searchParams

  if (!sessionId) notFound()

  let checkoutSession

  try {
    checkoutSession = await stripe.checkout.sessions.retrieve(sessionId)

    if (checkoutSession.payment_status !== 'paid') throw new Error('The checkout session is not paid.')
  } catch (error) {
    notFound()
  }

  const summaryData = {
    montant: util.product.getFormattedPrice(checkoutSession.amount_total ?? 0),
    'transaction ID': checkoutSession.payment_intent as string,
    'methode de paiment': ' **** 4242',
    date: new Date(1764585053 * 1000).toLocaleDateString(),
  }

  return (
    <main className={styles['main']}>
      <ResetCart />
      <div className={styles['container']}>
        <div className={styles['success-emoji']}>✅</div>
        <div className={styles['title-container']}>
          <h1 className={styles['title']}>Paiement réussi!</h1>
          <p className={styles['message']}>Votre paiement a été effectué avec succès.</p>
        </div>

        <div className={styles['payment-details']}>
          {Object.entries(summaryData).map((row, index) => (
            <div key={index} className={styles['row']}>
              <p className={styles['label']}>{row[0]}</p>
              <p className={styles['value']}>{row[1]}</p>
            </div>
          ))}
        </div>

        <ActionsContainerPaymentSuccessful />
      </div>
    </main>
  )
}
