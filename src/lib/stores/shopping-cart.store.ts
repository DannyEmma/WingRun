import { CartItem } from '@/lib/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ShoppingCartStore {
  cart: CartItem[]
  isOpen: boolean
  setCartOpen: (open: boolean) => void
  add: (item: CartItem) => void
  remove: (cartItemId: string) => void
  removeAll: () => void
  incrementQuantity: (cartItemId: string) => void
  decrementQuantity: (cartItemId: string) => void
  totalAmount: () => number
}

export const useShoppingCartStore = create<ShoppingCartStore>()(
  persist(
    (set, get) => {
      return {
        cart: [],
        isOpen: false,
        setCartOpen: (open) => set({ isOpen: open }),
        add: (item) => {
          const exist = (productId: number) => get().cart.some((item) => item.product.id === productId)
          const existSameSize = (cartItem: CartItem) => get().cart.filter((item) => item.size === cartItem.size)[0]
          const addToCart = () => set((state) => ({ cart: [...state.cart, item] }))

          //-- Increment existing product or add new product --
          if (exist(item.product.id)) {
            const sameSize = existSameSize(item)

            if (sameSize) {
              get().incrementQuantity(sameSize.id)
            } else {
              addToCart()
            }
          } else {
            addToCart()
          }
        },
        remove: (cartItemId) => {
          set((state) => {
            if (state.cart.length === 1) state.setCartOpen(false)
            return { cart: state.cart.filter((item) => item.id !== cartItemId) }
          })
        },
        removeAll: () => set({ cart: [] }),
        incrementQuantity: (cartItemId: string) => {
          set(({ cart }) => {
            const updatedItems = cart.map((item) => (item.id === cartItemId ? { ...item, quantity: item.quantity + 1 } : item))

            return { cart: updatedItems }
          })
        },
        decrementQuantity: (cartItemId: string) => {
          set(({ cart }) => {
            const updatedItems = cart.map((item) => (item.id === cartItemId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item))

            return { cart: updatedItems }
          })
        },
        totalAmount: () => {
          return get().cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
        },
      }
    },
    { name: 'shopping-cart', partialize: (state) => ({ cart: state.cart }) }
  )
)
