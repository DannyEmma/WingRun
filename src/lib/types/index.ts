//---------- ZOD TYPE ----------//

//-- Address --
export type { Address, CreateAddress } from './address'

//-- Destination --
export type { Destination, DestinationGroup, DestinationPerGroup } from './destination'

//-- User --
export type { User, UserWithAddresses } from './user'

//-- Product --
export type { Product } from './product'

//-- Brand --
export type { Brand } from './brand'

//-- BreadcrumbItem --
export type BreadcrumbItem = { label: string; url: string | null }

//-- Filter --
export type Filter = { type: 'brands' | 'colors' | 'sizes' | 'priceRange' | 'adults' | 'kids'; value: string; displayName: string }

//-- Sort --
export type Sort = { name: 'Prix croissant'; value: 'asc' } | { name: 'Prix décroissant'; value: 'desc' }
