import prisma from '@/lib/prisma'

const ColorFilterService = {
  getColorsFilter: async () => {
    let colorsFilter: { data: any; error: unknown } = { data: null, error: null }

    try {
      const result = await prisma.colorFilter.findMany()
      colorsFilter.data = result
    } catch (error) {
      colorsFilter.error = error
    }

    return colorsFilter
  },
}

export default ColorFilterService
