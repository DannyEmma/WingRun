import prisma from '@/lib/prisma'

const BrandService = {
  getAllBrand: async () => {
    const response: { data: string[] } = { data: [] }

    try {
      const brands = await prisma.brand.findMany({ select: { name: true } })

      response.data = brands.map((brand) => brand.name)
    } catch (error) {
      return { ...response, error }
    }

    return response
  },
}

export default BrandService
