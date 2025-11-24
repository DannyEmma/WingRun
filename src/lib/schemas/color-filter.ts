import z from 'zod'

export const ColorFilterSchema = z.object({
  id: z.int(),
  name: z.string(),
  color: z.string(),
})
