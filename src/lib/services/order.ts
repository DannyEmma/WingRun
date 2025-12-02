import prisma from '@/lib/prisma'

const OrderService = {
  getOrders: async (userId: string) => {
    const result: { data: any } = { data: null }

    try {
      result.data = await prisma.order.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } })
    } catch (error) {
      return { data: null, error }
    }

    return result
  },
}

export default OrderService
