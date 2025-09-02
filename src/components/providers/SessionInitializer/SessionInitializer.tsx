'use client'

import { useEffect } from 'react'
import { useUserStore } from '@/lib/stores/user.store'
import { Session } from 'better-auth'

interface SessionInitializerProps {
  session: Session | undefined
}

export default function SessionInitializer({ session }: SessionInitializerProps) {
  const setSession = useUserStore((state) => state.setSession)

  useEffect(() => {
    setSession(session)
  }, [])

  return null
}
