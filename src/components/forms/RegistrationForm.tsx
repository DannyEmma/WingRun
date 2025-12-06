'use client'

import styles from './Form.module.css'
import Link from 'next/link'
import authClient from '@/lib/auth-client'
import { useState } from 'react'
import { toast } from 'sonner'
import ErrorBanner from '@/components/shared/ErrorBanner/ErrorBanner'
import Loader from '@/components/shared/Loader/Loader'
import Input from '@/components/ui/Input/Input'
import CTA from '@/components/ui/CTA/CTA'

export default function RegistrationForm() {
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

        <Input id="firstname" label="prénom" type="text" name="firstname" required />

        <Input id="lastname" label="nom" type="text" name="lastname" required />

        <Input id="email" label="adresse e-mail" type="email" name="email" required />

        <Input id="password" label="mot de passe" type="password" name="password" required />

        <div className={styles['button-container']}>
          <CTA type="submit" variant="primary">
            S'inscrire {registrationPending && <Loader />}
          </CTA>
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
