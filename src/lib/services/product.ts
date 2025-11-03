import { PRODUCTS_PER_PAGE } from '@/lib/constants'
import prisma from '@/lib/prisma'
import { Sort } from '@/lib/types'
import { Audience, Brand } from '@prisma/client'

const ProductService = {
  getProductByAudience: async (audience: Audience) => {
    let products = []

    try {
      products = await prisma.product.findMany({ where: { audience: audience } })
    } catch (error) {
      return { data: [], error }
    }

    return { data: products }
  },

  getProductById: async (id: number) => {
    let product = null

    try {
      product = await prisma.product.findUnique({ where: { id } })
    } catch (error) {
      return { data: null, error }
    }

    return { data: product }
  },

  getProductsPerPage: async ({ skip, take, audience, filters, sort }: { skip: number; take: number; audience: Audience; filters: Record<string, any[] | null>; sort: string }) => {
    let productsPerPage: any[] = []
    let paginationInfos = { totalPages: 0, totalProducts: 0 }

    try {
      productsPerPage = await prisma.product.findMany({
        skip,
        take,
        where: {
          audience: audience,
          ...(filters.brands?.length && { brand: { in: filters.brands } }),
          ...(filters.colors?.length && { colorFilter: { color: { in: filters.colors } } }),
          ...(filters.sizes?.length && { sizes: { some: { size: { size: { in: filters.sizes } }, stock: { not: 0 } } } }),
          ...(filters.priceRange?.length && { price: { gte: filters.priceRange[0] * 100, lte: filters.priceRange[1] * 100 } }),
        },
        orderBy: {
          price: sort as 'asc' | 'desc',
        },
      })

      paginationInfos.totalProducts = (
        await prisma.product.aggregate({
          where: {
            audience: audience,
            ...(filters.brands?.length && { brand: { in: filters.brands } }),
            ...(filters.colors?.length && { colorFilter: { color: { in: filters.colors } } }),
            ...(filters.sizes?.length && { sizes: { some: { size: { size: { in: filters.sizes } }, stock: { not: 0 } } } }),
            ...(filters.priceRange?.length && { price: { gte: filters.priceRange[0] * 100, lte: filters.priceRange[1] * 100 } }),
          },
          _count: { _all: true },
        })
      )._count._all
    } catch (error) {
      return { data: null, error }
    }

    const totalPages = Math.ceil(paginationInfos.totalProducts / PRODUCTS_PER_PAGE)
    paginationInfos.totalPages = totalPages

    return { data: productsPerPage, pagination: paginationInfos }
  },
  getNbProducts: async () => {
    let promises = []

    try {
      promises = await Promise.all([
        prisma.product.aggregate({ _count: { _all: true } }),
        prisma.product.aggregate({ _count: { _all: true }, where: { audience: Audience.MEN } }),
        prisma.product.aggregate({ _count: { _all: true }, where: { audience: Audience.WOMEN } }),
        prisma.product.aggregate({ _count: { _all: true }, where: { audience: Audience.KIDS } }),
      ])
    } catch (error) {
      return { data: null, error }
    }

    return { data: { all: promises[0]._count._all, mens: promises[1]._count._all, womens: promises[2]._count._all, kids: promises[3]._count._all } }
  },
  getPriceRangeByAudience: async (audience: Audience) => {
    let [min, max] = [0, 0]

    try {
      const result = await prisma.product.aggregate({ _min: { price: true }, _max: { price: true }, where: { audience } })
      min = result._min.price ? result._min.price / 100 : NaN
      max = result._max.price ? result._max.price / 100 : NaN
    } catch (error) {
      return { data: [min, max], error }
    }
    return { data: [min, max] }
  },
}

export default ProductService
