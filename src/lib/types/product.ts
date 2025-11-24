import z from 'zod'
import { ProductSchema, ProductWithBrandSchema, ProductCartSchema } from '@/lib/schemas'

export type Product = z.infer<typeof ProductSchema>

export type ProductWithBrand = z.infer<typeof ProductWithBrandSchema>

export type ProductCart = z.infer<typeof ProductCartSchema>
