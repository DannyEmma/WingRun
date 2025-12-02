import { ProductCart } from '@/lib/types/product'
import { Size } from '@/lib/types/size'

export type CartItem = { id: string; product: ProductCart; quantity: number; size: Size }
