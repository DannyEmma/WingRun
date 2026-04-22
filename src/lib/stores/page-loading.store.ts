import { create } from 'zustand'

interface PageLoadingStore {
  loading: boolean
  setLoading: (value: boolean) => void
}

export const usePageLoadingStore = create<PageLoadingStore>((set) => ({
  loading: false,
  setLoading: (value) => set({ loading: value }),
}))
