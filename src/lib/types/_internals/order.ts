import { OrderSchema } from '@/lib/schemas'
import z from 'zod'

export type Order = z.infer<typeof OrderSchema>
