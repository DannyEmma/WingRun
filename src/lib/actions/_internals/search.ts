'use server'

import { service } from '@/lib/services'
import { ProductWithBrand, ServiceResponse } from '@/lib/types'
import { Audience } from '../../../../prisma/generated/enums'

export async function getSearchProductsAction(audience: Audience, query: string): Promise<ServiceResponse<{ products: ProductWithBrand[]; count: number }>> {
  return await service.product.getSearchProducts(audience, query)
}
