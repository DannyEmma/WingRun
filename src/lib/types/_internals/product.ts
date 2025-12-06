import z from 'zod'
import { ProductSchema, ProductWithBrandSchema, ProductCartSchema, ProductWithBrandAndColorFilterSchema } from '@/lib/schemas'

export type Product = z.infer<typeof ProductSchema>

export type ProductWithBrand = z.infer<typeof ProductWithBrandSchema>

export type ProductWithBrandAndColorFilter = z.infer<typeof ProductWithBrandAndColorFilterSchema>

export type ProductCart = z.infer<typeof ProductCartSchema>
