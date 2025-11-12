'use server'

import ProductService from '@/lib/services/product'
import { Audience } from '@prisma/client'

export async function getSearchProductsAction(audience: Audience, query: string) {
  return await ProductService.getSearchProducts(audience, query)
}
