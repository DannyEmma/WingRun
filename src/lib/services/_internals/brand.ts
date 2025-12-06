import prisma from '@/lib/prisma'
import { ServiceResponse } from '@/lib/types'

export class BrandService {
  async getAllBrand(): Promise<ServiceResponse<string[]>> {
    let response: ServiceResponse<string[]> = { data: null, error: null }

    try {
      const brands = await prisma.brand.findMany({ select: { name: true } })

      response.data = brands.map((brand) => brand.name)
    } catch (error) {
      if (error instanceof Error) response.error = error.message
    }

    return response
  }
}
