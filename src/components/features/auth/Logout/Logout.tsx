'use client'

import CTA from '@/components/ui/CTA/CTA'
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
    <CTA variant="secondary" onClick={handleLogout} fit>
      {children}
    </CTA>
  )
}
