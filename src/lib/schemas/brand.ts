import z from 'zod'

export const BrandSchema = z.object({
  id: z.int(),
  name: z.string(),
})
