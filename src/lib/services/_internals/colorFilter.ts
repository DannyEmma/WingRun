import prisma from '@/lib/prisma'
import { ServiceResponse } from '@/lib/types'
import { ColorFilter } from '@/lib/types/_internals/color-filter'

export class ColorFilterService {
  async getColorsFilter(): Promise<ServiceResponse<ColorFilter[]>> {
    let response: ServiceResponse<ColorFilter[]> = { data: null, error: null }

    try {
      const result = await prisma.colorFilter.findMany()
      response.data = result
    } catch (error) {
      if (error instanceof Error) response.error = error.message
    }

    return response
  }
}
