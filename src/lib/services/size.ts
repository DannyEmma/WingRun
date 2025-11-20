import prisma from '@/lib/prisma'
import { Audience } from '@prisma/client'

const SizeService = {
  getSizesByAudience: async (audiences: Audience[]) => {
    let sizes: string[] = []

    //-- Use because kids sizes is same --
    if (audiences.includes(Audience.BOY) || audiences.includes(Audience.GIRL)) audiences = ['KIDS']

    try {
      if (audiences.length) {
        const result = await prisma.size.findMany({ select: { size: true }, where: { audience: { in: audiences } } })
        sizes = result.map((r) => r.size)
      }
    } catch (error) {
      return { data: sizes, error }
    }
    return { data: sizes }
  },
}

export default SizeService
