import z from 'zod'
import { DestinationSchema, DestinationGroupSchema } from '../schemas'

export type Destination = z.infer<typeof DestinationSchema>

export type DestinationGroup = z.infer<typeof DestinationGroupSchema>

export type DestinationsPerGroup = [DestinationGroup, Destination[]][]
