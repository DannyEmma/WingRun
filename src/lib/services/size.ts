import prisma from '@/lib/prisma'
import { Audience } from '@prisma/client'

const SizeService = {
  getSizesByAudience: async (audience: Audience) => {
    let sizes: string[] = []

    try {
      const result = await prisma.size.findMany({ select: { size: true }, where: { audience } })
      sizes = result.map((r) => r.size)
    } catch (error) {
      return { data: sizes, error }
    }
    return { data: sizes }
  },
}

export default SizeService
