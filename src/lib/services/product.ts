import prisma from '@/lib/prisma'
import { Audience } from '@prisma/client'

const ProductService = {
  getProductByAudience: async (audience: Audience) => {
    let products = []

    try {
      products = await prisma.product.findMany({ where: { audience: audience } })
    } catch (error) {
      return { data: [], error }
    }

    return { data: products }
  },
}

export default ProductService
