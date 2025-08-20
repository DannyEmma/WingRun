'use client'

import styles from './Form.module.css'
import authClient from '@/lib/auth-client'
import { redirect, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import Button from '@/components/Button/Button'
import ErrorBanner from '../ErrorBanner/ErrorBanner'
import { toast } from 'sonner'
import Loader from '../Loader/Loader'

export default function ResetPassword() {
  const [errorCode, setErrorCode] = useState<string | null>(null)
  const [resetPending, setResetPending] = useState(false)
  const token = useSearchParams().get('token')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    //-- Start loader --
    setResetPending(true)
    const [password, confirmePassword] = new FormData(e.target as HTMLFormElement).values()

    if (!token) {
      //-- Stop loader --
      setResetPending(false)
      setErrorCode('CUSTOM_RESET_PASSWORD_TOKEN_INVALID')

      return
    }

    if (password !== confirmePassword) {
      //-- Stop loader --
      setResetPending(false)
      setErrorCode('CUSTOM_PASSWORDS_DO_NOT_MATCH')

      return
    }

    const { data, error } = await authClient.resetPassword({
      newPassword: password as string,
      token,
    })

    //-- Use to display error messages or success --
    if (error && error.code) {
      setErrorCode(error.code)
    } else {
      setErrorCode(null)

      toast.success('Mot de passe mis à jour', {
        description: 'Votre mot de passe a été modifié avec succès.',
      })

      redirect('/login')
    }

    //-- Stop loader --
    setResetPending(false)
  }
  //---------- EVENT HANDLER ----------
  return (
    <form onSubmit={handleSubmit} className={`${styles.form} ${styles['reset-password-form']}`}>
      <ErrorBanner code={errorCode} />

      <h1 className={styles.title}>Réinitialiser votre mot de passe</h1>

      <div className={styles['input-container']}>
        <label htmlFor="password">
          Nouveau mot de passe <sup>*</sup>
        </label>
        <input id="password" type="password" name="password" required />
      </div>

      <div className={styles['input-container']}>
        <label htmlFor="confirmePassword">
          Confirmez le mot de passe<sup>*</sup>
        </label>
        <input id="confirmePassword" type="password" name="confirmePassword" required />
      </div>

      <div className={styles['button-container']}>
        <Button type="submit">Envoyer {resetPending && <Loader />}</Button>
      </div>
    </form>
  )
}
