'use client'

import styles from './Form.module.css'
import Image from 'next/image'
import Link from 'next/link'
import authClient from '@/lib/auth-client'
import Button from '@/components/ui/Button/Button'
import ErrorBanner from '@/components/shared/ErrorBanner/ErrorBanner'
import { useState } from 'react'
import Loader from '@/components/shared/Loader/Loader'
import { toast } from 'sonner'
import { redirect } from 'next/navigation'
import { useUserStore } from '@/lib/stores/user.store'
import Input from '@/components/ui/Input/Input'
import UserService from '@/lib/services/user'

export default function LoginForm() {
  const [errorCode, setErrorCode] = useState<string | null>(null)
  const [loginPending, setLoginPending] = useState(false)
  const setSession = useUserStore((state) => state.setSession)
  const session = useUserStore((state) => state.session)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    //-- User already connected ? then signOut --
    if (session) {
      await authClient.signOut()
      setSession(null)
    }

    //-- Start loader --
    setLoginPending(true)

    const [email, password] = new FormData(e.target as HTMLFormElement).values()

    //-- SignIn and create the new session--
    const { data, error } = await authClient.signIn.email({
      email: email as string,
      password: password as string,
    })

    const newSession = await (await authClient.getSession()).data?.session

    //-- Use to display error messages or success --
    if (error && error.code) {
      setErrorCode(error.code)
    } else {
      setErrorCode(null)

      toast.success('Bienvenue !', {
        description: 'Heureux de vous revoir. Vous êtes connecté.',
      })

      setSession(newSession)

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

      <Input id="email" label="adresse e-mail" type="email" name="email" required />

      <div className={styles['password-container']}>
        <Input id="password" label="mot de passe" type="password" name="password" required />
        <Link href={'/forgot-password'} className={`${styles['forgot-password']} ${styles.link}`}>
          Mot de passe oublié ?
        </Link>
      </div>

      <div className={styles['button-container']}>
        <Button variant="cta-primary" type="submit">
          Se connecter {loginPending && <Loader />}
        </Button>
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
