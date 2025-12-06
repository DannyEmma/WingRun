import { ProductCart } from '@/lib/types/_internals/product'
import { Size } from '@/lib/types/_internals/size'

export type CartItem = { id: string; product: ProductCart; quantity: number; size: Size }
