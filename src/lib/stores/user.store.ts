import { UserWithAddresses } from '@/lib/types'
import { Session } from 'better-auth'
import { create } from 'zustand'

type SessionState = Session | null | undefined
type UserState = UserWithAddresses | null | undefined

interface UserStore {
  user: UserState
  session: SessionState
  setSession: (value: SessionState) => void
  setUser: (value: UserState) => void
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  session: null,
  setSession: (session) => set({ session }),
  setUser: (user) => set({ user }),
}))
