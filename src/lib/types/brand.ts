import z from 'zod'
import { BrandSchema } from '@/lib/schemas'

export type Brand = z.infer<typeof BrandSchema>
