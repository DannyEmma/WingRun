'use client'

import styles from './Form.module.css'
import Link from 'next/link'
import authClient from '@/lib/auth-client'
import { useState } from 'react'
import ActionLink from '@/components/ui/ActionLink/ActionLink'
import ErrorBanner from '@/components/shared/ErrorBanner/ErrorBanner'
import { toast } from 'sonner'
import Loader from '../shared/Loader/Loader'

export default function ForgotPassword() {
  const [errorCode, setErrorCode] = useState<string | null>(null)
  const [requestPasswordPending, setRequestPasswordPending] = useState(false)

  //---------- EVENTS HANDLERS ----------
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    //-- Start loader --
    setRequestPasswordPending(true)

    const email = new FormData(e.target as HTMLFormElement).get('email') as string

    if (email) {
      const { data, error } = await authClient.requestPasswordReset({
        email, // required
        redirectTo: '/reset-password',
      })

      //-- Use to display error messages or success --
      if (error && error.code) {
        setErrorCode(error.code)
      } else {
        setErrorCode(null)

        toast.success('E-mail envoyé', {
          description: 'Un lien de réinitialisation de mot de passe vient de vous être envoyé.',
        })
      }
    }

    //-- Stop loader --
    setRequestPasswordPending(false)
  }

  return (
    <>
      <ErrorBanner code={errorCode} />

      <form onSubmit={handleSubmit} className={`${styles.form}`}>
        <h1 className={styles.title}>Récupérer l’accès à votre compte</h1>

        <div className={styles['input-container']}>
          <label htmlFor="email">
            adresse e-mail <sup>*</sup>
          </label>
          <input id="email" type="email" name="email" required />
        </div>

        <div className={styles['button-container']}>
          <ActionLink type="submit">Envoyer {requestPasswordPending && <Loader />}</ActionLink>
        </div>

        <div className={styles['caption-container']}>
          <Link href={'/login'} className={styles.link}>
            <ActionLink>Retour</ActionLink>
          </Link>
        </div>
      </form>
    </>
  )
}
