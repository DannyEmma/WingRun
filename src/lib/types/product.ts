import z from 'zod'
import { ProductSchema, ProductWithBrandSchema } from '@/lib/schemas'

export type Product = z.infer<typeof ProductSchema>

export type ProductWithBrand = z.infer<typeof ProductWithBrandSchema>
