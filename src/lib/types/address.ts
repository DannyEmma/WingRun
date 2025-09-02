import z from 'zod'
import { AddressSchema, CreateAddressSchema } from '../schemas'

export type Address = z.infer<typeof AddressSchema>

export type CreateAddress = z.infer<typeof CreateAddressSchema>
