import prisma from '@/lib/prisma'
import { Order, ServiceResponse } from '@/lib/types'

export class OrderService {
  async getOrders(userId: string): Promise<ServiceResponse<Order[]>> {
    let response: ServiceResponse<Order[]> = { data: null, error: null }

    try {
      response.data = await prisma.order.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } })
    } catch (error) {
      if (error instanceof Error) response.error = error.message
    }

    return response
  }
}
