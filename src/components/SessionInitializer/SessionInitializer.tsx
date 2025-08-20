'use client'

import { useEffect } from 'react'
import authClient from '@/lib/auth-client'
import { useUserStore } from '@/lib/stores/user.store'

export default function SessionInitializer() {
  const setSession = useUserStore((state) => state.setSession)

  useEffect(() => {
    ;(async () => {
      const session = (await authClient.getSession()).data?.session

      setSession(session)
    })()
  }, [])

  return null
}
