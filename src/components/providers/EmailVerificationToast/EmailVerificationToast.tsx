'use client'

import { useEffect } from 'react'
import { toast } from 'sonner'

export default function EmailVerificationToast() {
  useEffect(() => {
    const success = document.cookie.split(';').find((row) => row.trim().startsWith('verified_email_success='))

    if (success) {
      toast.success('Compte activé', { description: 'Votre adresse e-mail a bien été confirmée.' })
      document.cookie = 'verified_email_success=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'
    }
  }, [])

  return null
}
