'use client'

import Button from '@/components/ui/Button/Button'
import authClient from '@/lib/auth-client'
import { useUserStore } from '@/lib/stores/user.store'
import { redirect } from 'next/navigation'

export default function Logout({ children }: { children: React.ReactNode }) {
  const setSession = useUserStore((state) => state.setSession)

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          setSession(null)
          redirect('/login')
        },
      },
    })
  }
  return (
    <Button variant="cta-secondary" onClick={handleLogout} fit>
      {children}
    </Button>
  )
}
