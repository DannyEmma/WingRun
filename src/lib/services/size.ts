import prisma from '@/lib/prisma'
import { Size } from '@/lib/types'
import { Audience } from '@prisma/client'

const SizeService = {
  getSizesByAudience: async (audiences: Audience[]) => {
    let sizes: Size[] = []

    //-- Use because kids sizes is same --
    if (audiences.includes(Audience.BOY) || audiences.includes(Audience.GIRL)) audiences = ['KIDS']

    try {
      if (audiences.length) {
        sizes = await prisma.size.findMany({ where: { audience: { in: audiences } } })
      }
    } catch (error) {
      return { data: sizes, error }
    }
    return { data: sizes }
  },
}

export default SizeService
