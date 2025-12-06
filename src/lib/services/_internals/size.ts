import prisma from '@/lib/prisma'
import { ServiceResponse, Size } from '@/lib/types'
import { Audience } from '@/../prisma/generated/enums'

export class SizeService {
  async getSizesByAudience(audiences: Audience[]): Promise<ServiceResponse<Size[]>> {
    let response: ServiceResponse<Size[]> = { data: null, error: null }

    //-- Use because kids sizes is same --
    if (audiences.includes(Audience.BOY) || audiences.includes(Audience.GIRL)) audiences = ['KIDS']

    try {
      if (audiences.length) {
        response.data = await prisma.size.findMany({ where: { audience: { in: audiences } } })
      }
    } catch (error) {
      if (error instanceof Error) response.error = error.message
    }

    return response
  }
}
