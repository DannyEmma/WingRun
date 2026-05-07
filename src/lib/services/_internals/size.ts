import { prisma } from "@/lib/prisma"
import { ServiceResponse, Size } from "@/lib/types"
import { Audience, CategorySize } from "@/../prisma/generated/enums"

export class SizeService {
  async getSizesByAudience(audiences: Audience[]): Promise<ServiceResponse<Size[]>> {
    const response: ServiceResponse<Size[]> = { data: null, error: null }
    const categories: CategorySize[] = audiences.map((audience) => {
      if (audience === Audience.GIRL || audience === Audience.BOY) return "KIDS"

      return audience
    })

    try {
      response.data = await prisma.size.findMany({ where: { ...(categories.length && { category: { in: categories } }) } })
    } catch (error) {
      if (error instanceof Error) response.error = error.message
    }

    return response
  }
}
