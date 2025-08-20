'use client'

import authClient from '@/lib/auth-client'
import { redirect } from 'next/navigation'

export default function Logout({ children }: { children: React.ReactNode }) {
  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          redirect('/login')
        },
      },
    })
  }
  return <button onClick={handleLogout}>{children}</button>
}
