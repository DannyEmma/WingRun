import { Audience } from '@prisma/client'
import z from 'zod'

export const SizeSchema = z.object({
  id: z.int(),
  size: z.string(),
  audience: z.enum(Object.values(Audience)),
})
