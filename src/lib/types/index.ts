import { Session } from 'better-auth'
import * as z from 'zod'

export type SessionType = Session | null | undefined

export const AddressSchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  destinationId: z.number(),
  address: z.string(),
  address_2: z.string(),
  city: z.string(),
  cp: z.string(),
  phone: z.string(),
  isDefault: z.boolean(),
})

export type Address = z.infer<typeof AddressSchema>

export type Destination = {
  id: number
  name: string
  group: string
  actif: boolean
  code_iso: string
}
