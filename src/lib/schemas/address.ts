import z from 'zod'
import { DestinationSchema } from './destination'

export const AddressSchema = z.object({
  id: z.number(),

  firstname: z.string().min(1, 'CUSTOM_FIRSTNAME_REQUIRED').max(50, 'CUSTOM_FIRSTNAME_TOO_LONG'),

  lastname: z.string().min(1, 'CUSTOM_NAME_REQUIRED').max(50, 'CUSTOM_NAME_TOO_LONG'),

  address: z.string().min(1, 'CUSTOM_ADDRESS_REQUIRED').max(100, 'CUSTOM_ADDRESS_TOO_LONG'),

  address_2: z.string().max(100, 'CUSTOM_ADDRESS_2_TOO_LONG').nullable(),

  city: z.string().min(1, 'CUSTOM_CITY_REQUIRED').max(80, 'CUSTOM_CITY_TOO_LONG'),

  cp: z.string().regex(/^\d{4,6}$/, 'CUSTOM_CP_INVALID'),

  phone: z.string().regex(/^\+?\d{6,15}$/, 'CUSTOM_PHONE_INVALID'),

  isDefault: z.boolean(),

  destinationId: z.number(),

  destination: DestinationSchema,
})

export const CreateAddressSchema = AddressSchema.omit({ id: true })
