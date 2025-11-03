//---------- ZOD TYPE ----------//

export type { Address, CreateAddress } from './address'

export type { Destination, DestinationGroup, DestinationPerGroup } from './destination'

export type { User, UserWithAddresses } from './user'

export type BreadcrumbItem = { label: string; url: string | null }

export type Filter = { type: 'brands' | 'colors' | 'sizes' | 'priceRange' | 'sort'; value: string; displayName: string }

export type Sort = { name: 'Prix croissant'; value: 'asc' } | { name: 'Prix décroissant'; value: 'desc' }
