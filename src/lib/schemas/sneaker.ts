import z from 'zod'

// export const DestinationGroupSchema = z.enum(['METROPOLE', 'DOM'])

export const DestinationSchema = z.object({
  id: z.number(),
  name: z.string(),
  group: DestinationGroupSchema,
  actif: z.boolean(),
  code_iso: z.string(),
})
