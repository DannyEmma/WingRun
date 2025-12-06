//---------- ZOD TYPE ----------//

import { Audience } from '@/../prisma/generated/enums'

//-- Address --
export type { Address, CreateAddress } from './_internals/address'

//-- Destination --
export type { Destination, DestinationGroup, DestinationsPerGroup } from './_internals/destination'

//-- User --
export type { User, UserWithAddresses } from './_internals/user'

//-- Product --
export type { Product, ProductCart, ProductWithBrand, ProductWithBrandAndColorFilter } from './_internals/product'

//-- Product --
export type { Size } from './_internals/size'

//-- Shopping Cart --
export type { CartItem } from './_internals/shopping-cart'

//-- Brand --
export type { Brand } from './_internals/brand'

//-- BreadcrumbItem --
export type BreadcrumbItem = { label: string; url: string | null }

//-- Filter --
export type Filter = { type: 'brands' | 'colors' | 'sizes' | 'priceRange' | 'adults' | 'kids'; value: string; displayName: string }

//-- Sort --
export type Sort = { name: 'Prix croissant'; value: 'asc' } | { name: 'Prix décroissant'; value: 'desc' }

//-- Adult --
export type Adult = typeof Audience.MEN | typeof Audience.WOMEN

//-- Kid --
export type Kid = typeof Audience.BOY | typeof Audience.GIRL

//-- Order --
export type { Order } from './_internals/order'

//-- Services --
export type ServiceResponse<T> = {
  data: T | null
  error: string | null
}
