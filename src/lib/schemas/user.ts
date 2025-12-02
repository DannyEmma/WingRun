import { AddressSchema } from '@/lib/schemas/address'
import z from 'zod'

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const UserWithAddressesSchema = UserSchema.extend({
  addresses: z.array(AddressSchema),
})
