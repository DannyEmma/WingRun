import z from 'zod'
import { UserSchema } from '../../schemas'
import { UserWithAddressesSchema } from '@/lib/schemas/user'

export type User = z.infer<typeof UserSchema>
export type UserWithAddresses = z.infer<typeof UserWithAddressesSchema>
