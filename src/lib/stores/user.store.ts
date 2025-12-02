import { UserWithAddresses } from '@/lib/types'
import { Session } from 'better-auth'
import { create } from 'zustand'

type SessionState = Session | null | undefined

interface UserStore {
  session: SessionState
  setSession: (value: SessionState) => void
}

export const useUserStore = create<UserStore>((set) => ({
  session: null,
  setSession: (session) => set({ session }),
}))
