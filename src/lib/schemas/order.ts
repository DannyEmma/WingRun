import { OrderStatus } from '@/../prisma/generated/enums'
import z from 'zod'

export const OrderSchema = z.object({
  id: z.int(),
  userId: z.string(),
  totalAmountCent: z.int(),
  stripeSessionId: z.string().nullable(),
  stripePaymentId: z.string().nullable(),
  paymentMethod: z.string().nullable(),
  transactionId: z.string().nullable(),
  status: z.enum(Object.values(OrderStatus)),
  createdAt: z.date(),
  updatedAt: z.date(),
})
