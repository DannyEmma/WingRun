import { ProductCart } from '@/lib/types/product'

export type CartItem = { id: string; product: ProductCart; quantity: number; size: string }
