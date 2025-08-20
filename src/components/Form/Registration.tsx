'use client'

import styles from './Form.module.css'
import Link from 'next/link'
import authClient from '@/lib/auth-client'
import { useState } from 'react'
import { toast } from 'sonner'
import Button from '@/components/Button/Button'
import ErrorBanner from '@/components/ErrorBanner/ErrorBanner'
import Loader from '@/components/Loader/Loader'

export default function Registration() {
  const [registrationPending, setRegistrationPending] = useState(false)
  const [errorCode, setErrorCode] = useState<string | null>(null)

  //---------- EVENTS HANDLERS -----------
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    //-- Start loader --
    setRegistrationPending(true)

    const [firstname, lastname, email, password] = new FormData(e.target as HTMLFormElement).values()

    //-- Sign up --
    const { data, error } = await authClient.signUp.email({
      name: (firstname as string) + ' ' + (lastname as string),
      email: email as string, // required
      password: password as string,
      // rememberMe: false,
      // callbackURL: "https://example.com/callback",
    })

    //-- Use to display error messages or success --
    if (error && error.code) {
      setErrorCode(error.code)
    } else {
      setErrorCode(null)

      toast.success('E-mail envoyé', {
        description: 'Un e-mail de confirmation vient de vous être envoyé.',
      })
    }

    //-- Stop loader --
    setRegistrationPending(false)
  }

  return (
    <>
      <form onSubmit={handleSubmit} className={`${styles.form} ${styles['registration-form']}`}>
        <ErrorBanner code={errorCode} />

        <h1 className={styles.title}>
          On dirait que vous êtes nouveau ici… <br />
          On va arranger ça !
        </h1>

        <div className={styles['input-container']}>
          <label htmlFor="firstname">
            prénom <sup>*</sup>
          </label>
          <input id="firstname" type="text" name="firstname" required />
        </div>

        <div className={styles['input-container']}>
          <label htmlFor="lastname">
            nom <sup>*</sup>
          </label>
          <input id="lastname" type="text" name="lastname" required />
        </div>

        <div className={styles['input-container']}>
          <label htmlFor="email">
            adresse e-mail <sup>*</sup>
          </label>
          <input id="email" type="email" name="email" required />
        </div>

        <div className={styles['input-container']}>
          <label htmlFor="password">
            mot de passe <sup>*</sup>
          </label>
          <input id="password" type="password" name="password" required />
        </div>
        <div className={styles['button-container']}>
          <Button type="submit">S'inscrire {registrationPending && <Loader />}</Button>
        </div>

        <div className={styles['caption-container']}>
          <p className={styles['create-account']}>
            Vous avez déjà un compte WingRun ?{' '}
            <Link href={'/login'} className={styles.link}>
              Connectez-vous ici
            </Link>
          </p>
        </div>
      </form>
    </>
  )
}
