'use client'

import styles from './Form.module.css'
import Image from 'next/image'
import Link from 'next/link'
import authClient from '@/lib/auth-client'
import Button from '@/components/Button/Button'
import ErrorBanner from '@/components/ErrorBanner/ErrorBanner'
import { useState } from 'react'
import Loader from '@/components/Loader/Loader'
import { toast } from 'sonner'
import { redirect } from 'next/navigation'
import { useUserStore } from '@/lib/stores/user.store'
import { SessionType } from '@/lib/types'

export default function Login() {
  const [errorCode, setErrorCode] = useState<string | null>(null)
  const [loginPending, setLoginPending] = useState(false)
  const setSession = useUserStore((state) => state.setSession)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log('handleSubmit')

    e.preventDefault()
    //-- Start loader --
    setLoginPending(true)

    const [email, password] = new FormData(e.target as HTMLFormElement).values()

    const { data, error } = await authClient.signIn.email({
      email: email as string,
      password: password as string,
      // rememberMe: false,
      // callbackURL: "https://example.com/callback",
    })

    const session = await (await authClient.getSession()).data?.session

    //-- Use to display error messages or success --
    if (error && error.code) {
      session ? redirect('/account') : setErrorCode(error.code)
    } else {
      setErrorCode(null)

      toast.success('Bienvenue !', {
        description: 'Heureux de vous revoir. Vous êtes connecté.',
      })

      setSession(session)

      redirect('/account')
    }

    //-- Stop loader --
    setLoginPending(false)
  }

  return (
    <form onSubmit={handleSubmit} className={`${styles.form} ${styles['login-form']}`}>
      <ErrorBanner code={errorCode} />

      <h1 className={styles.title}>
        Bienvenue chez WingRun <Image className={styles['wing-run-icon']} src="/icons/wing-run-icon.svg" alt="WingRun icon" height={25} width={25} />
      </h1>

      <div className={styles['input-container']}>
        <label htmlFor="email">
          e-mail <sup>*</sup>
        </label>
        <input id="email" type="email" name="email" required />
      </div>

      <div className={styles['input-container']}>
        <label htmlFor="password">
          mot de passe <sup>*</sup>
        </label>
        <input id="password" type="password" name="password" required />
        <Link href={'/forgot-password'} className={`${styles['forgot-password']} ${styles.link}`}>
          Mot de passe oublié ?
        </Link>
      </div>

      <div className={styles['button-container']}>
        <Button type="submit">Se connecter {loginPending && <Loader />}</Button>
      </div>

      <div className={styles['caption-container']}>
        <p className={styles['create-account']}>
          Vous n'avez pas de compte WingRun ?{' '}
          <Link href={'/registration'} className={styles.link}>
            Créer un compte
          </Link>
        </p>
      </div>
    </form>
  )
}
