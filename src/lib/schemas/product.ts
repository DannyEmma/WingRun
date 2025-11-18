import { BrandSchema } from '@/lib/schemas/brand'
import { Audience, ProductTag } from '@prisma/client'
import z from 'zod'

export const ProductSchema = z.object({
  id: z.int(),
  line: z.string(),
  model: z.string(),
  colorway: z.string(),
  year: z.string(),
  price: z.int(),
  description: z.string(),
  image: z.string(),
  visuals: z.array(z.string()),
  edition: z.string().nullable(),
  brandId: z.int(),
  colorFilterId: z.int().nullable(),
  tags: z.array(z.enum(ProductTag)),
  audience: z.enum(Audience),
})

export const ProductWithBrandSchema = ProductSchema.extend({
  brand: BrandSchema,
})
