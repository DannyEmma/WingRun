//---------- ZOD TYPE ----------//

import { Audience } from '@prisma/client'

//-- Address --
export type { Address, CreateAddress } from './address'

//-- Destination --
export type { Destination, DestinationGroup, DestinationPerGroup } from './destination'

//-- User --
export type { User, UserWithAddresses } from './user'

//-- Product --
export type { Product, ProductCart } from './product'

//-- Shopping Cart --
export type { CartItem } from './shopping-cart'

//-- Brand --
export type { Brand } from './brand'

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
