import z from 'zod'
import { ColorFilterSchema } from '@/lib/schemas'

export type ColorFilter = z.infer<typeof ColorFilterSchema>
