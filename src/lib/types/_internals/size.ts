import { SizeSchema } from '@/lib/schemas'
import z from 'zod'

export type Size = z.infer<typeof SizeSchema>
