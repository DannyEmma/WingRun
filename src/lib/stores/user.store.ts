import { Session } from 'better-auth'
import { create } from 'zustand'
import { SessionType } from '@/lib/types'

type UserStore = {
  session: SessionType
  setSession: (value: SessionType) => void
}

export const useUserStore = create<UserStore>((set) => ({
  session: null,
  setSession: (session) => set({ session }),
}))
