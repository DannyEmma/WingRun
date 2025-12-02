import { MAX_SLIDER_PRODUCTS, PRODUCTS_PER_PAGE, PRODUCTS_PER_SEARCH } from '@/lib/constants'
import prisma from '@/lib/prisma'
import { Product } from '@/lib/types'
import { ProductWithBrand } from '@/lib/types/product'
import { Audience, ProductTag } from '@prisma/client'

const ProductService = {
  getProductById: async (id: number) => {
    let product = null

    try {
      product = await prisma.product.findUnique({ where: { id }, include: { brand: true, colorFilter: true } })
    } catch (error) {
      return { data: null, error }
    }

    return { data: product }
  },

  getProductsPerPageByAudience: async ({
    skip,
    take,
    audiences,
    filters,
    sort,
  }: {
    skip: number
    take: number
    audiences: Audience[]
    filters: Record<string, any[] | null>
    sort: string
  }) => {
    let productsPerPage: any[] = []
    let paginationInfos = { totalPages: 0, totalProducts: 0 }

    try {
      if (audiences.length) {
        productsPerPage = await prisma.product.findMany({
          skip,
          take,
          where: {
            audience: { in: audiences },
            ...(filters.brands?.length && { brand: { name: { in: filters.brands } } }),
            ...(filters.colors?.length && { colorFilter: { color: { in: filters.colors } } }),
            ...(filters.sizes?.length && { sizes: { some: { size: { size: { in: filters.sizes } }, stock: { not: 0 } } } }),
            ...(filters.priceRange?.length && { price: { gte: filters.priceRange[0] * 100, lte: filters.priceRange[1] * 100 } }),
          },
          orderBy: {
            price: sort as 'asc' | 'desc',
          },
          include: { brand: true },
        })

        paginationInfos.totalProducts = (
          await prisma.product.aggregate({
            where: {
              audience: { in: audiences },
              ...(filters.brands?.length && { brand: { name: { in: filters.brands } } }),
              ...(filters.colors?.length && { colorFilter: { color: { in: filters.colors } } }),
              ...(filters.sizes?.length && { sizes: { some: { size: { size: { in: filters.sizes } }, stock: { not: 0 } } } }),
              ...(filters.priceRange?.length && { price: { gte: filters.priceRange[0] * 100, lte: filters.priceRange[1] * 100 } }),
            },
            _count: { _all: true },
          })
        )._count._all
      }
    } catch (error) {
      return { data: null, error }
    }

    const totalPages = Math.ceil(paginationInfos.totalProducts / PRODUCTS_PER_PAGE)
    paginationInfos.totalPages = totalPages

    return { data: productsPerPage, pagination: paginationInfos }
  },
  getPriceRangeByAudience: async (audiences: Audience[]) => {
    let [min, max] = [0, 0]

    try {
      if (audiences.length) {
        const result = await prisma.product.aggregate({ _min: { price: true }, _max: { price: true }, where: { audience: { in: audiences } } })
        min = result._min.price ? result._min.price / 100 : NaN
        max = result._max.price ? result._max.price / 100 : NaN
      }
    } catch (error) {
      return { data: [NaN, NaN], error }
    }
    return { data: [min, max] }
  },
  getSizesStock: async (productId: number) => {
    let sizesStock: string[] = []

    try {
      const result = await prisma.productSize.findMany({
        select: {
          size: {
            select: {
              size: true,
            },
          },
        },
        where: {
          productId,
          stock: {
            not: 0,
          },
        },
      })

      //-- Reformated data to string[] --//
      sizesStock = result.map((productSize) => productSize.size.size)
    } catch (error) {
      return { data: sizesStock, error }
    }

    return { data: sizesStock }
  },

  getSearchProducts: async (audience: Audience, searchQuery: string) => {
    let productsSearch: { products: any[]; count: number } = { products: [], count: 0 }

    try {
      const promise1 = prisma.product.findMany({
        where: {
          audience,
          OR: [
            { line: { search: searchQuery } },
            { model: { search: searchQuery } },
            { colorway: { search: searchQuery } },
            { edition: { search: searchQuery } },
            { year: { search: searchQuery } },
            { brand: { name: { search: searchQuery } } },
          ],
        },
        take: PRODUCTS_PER_SEARCH,
        orderBy: {
          _relevance: {
            fields: ['line', 'model', 'colorway', 'edition', 'year'],
            search: searchQuery,
            sort: 'desc',
          },
        },
        include: { brand: true },
      })

      const promise2 = await prisma.product.aggregate({
        _count: {
          _all: true,
        },
        where: {
          audience,
          OR: [
            { line: { search: searchQuery } },
            { model: { search: searchQuery } },
            { colorway: { search: searchQuery } },
            { edition: { search: searchQuery } },
            { year: { search: searchQuery } },
            { brand: { name: { search: searchQuery } } },
          ],
        },
        orderBy: {
          _relevance: {
            fields: ['line', 'model', 'colorway', 'edition', 'year'],
            search: searchQuery,
            sort: 'desc',
          },
        },
      })

      const [products, count] = await Promise.all([promise1, promise2])
      productsSearch.products = products
      productsSearch.count = count._count._all
    } catch (error) {
      return { data: productsSearch, error }
    }

    return { data: productsSearch }
  },
  getProductsPerPageBySearchQuery: async ({
    audience,
    searchQuery,
    skip,
    take,
    filters,
    sort,
  }: {
    searchQuery: string
    skip: number
    take: number
    audience: Audience
    filters: Record<string, any[] | null>
    sort: string
  }) => {
    let productsSearchPerPage: { products: any[]; count: number; pagination: { totalPages: number } } = {
      products: [],
      count: 0,
      pagination: { totalPages: 0 },
    }

    try {
      //-- Products to one page --
      const promise1 = prisma.product.findMany({
        where: {
          audience,
          OR: [
            { line: { search: searchQuery } },
            { model: { search: searchQuery } },
            { colorway: { search: searchQuery } },
            { edition: { search: searchQuery } },
            { year: { search: searchQuery } },
            { brand: { name: { search: searchQuery } } },
          ],

          ...(filters.brands?.length && { brand: { name: { in: filters.brands } } }),
          ...(filters.colors?.length && { colorFilter: { color: { in: filters.colors } } }),
          ...(filters.sizes?.length && { sizes: { some: { size: { size: { in: filters.sizes } }, stock: { not: 0 } } } }),
          ...(filters.priceRange?.length && { price: { gte: filters.priceRange[0] * 100, lte: filters.priceRange[1] * 100 } }),
        },
        take,
        skip,
        orderBy: [
          {
            _relevance: {
              fields: ['line', 'model', 'colorway', 'edition', 'year'],
              search: searchQuery,
              sort: 'desc',
            },
          },
          { price: sort as 'asc' | 'desc' },
        ],
        include: { brand: true },
      })

      //-- Total products count --
      const promise2 = prisma.product.count({
        where: {
          audience,
          OR: [
            { line: { search: searchQuery } },
            { model: { search: searchQuery } },
            { colorway: { search: searchQuery } },
            { edition: { search: searchQuery } },
            { year: { search: searchQuery } },
            { brand: { name: { search: searchQuery } } },
          ],
          ...(filters.brands?.length && { brand: { name: { in: filters.brands } } }),
          ...(filters.colors?.length && { colorFilter: { color: { in: filters.colors } } }),
          ...(filters.sizes?.length && { sizes: { some: { size: { size: { in: filters.sizes } }, stock: { not: 0 } } } }),
          ...(filters.priceRange?.length && { price: { gte: filters.priceRange[0] * 100, lte: filters.priceRange[1] * 100 } }),
        },
      })

      const [products, count] = await Promise.all([promise1, promise2])
      productsSearchPerPage.products = products
      productsSearchPerPage.count = count
      productsSearchPerPage.pagination.totalPages = Math.ceil(count / PRODUCTS_PER_PAGE)
    } catch (error) {
      return { data: productsSearchPerPage, error }
    }

    return { data: productsSearchPerPage }
  },
  getSliderProductsWithBrandByTag: async (tag: ProductTag) => {
    let result: Record<'data', ProductWithBrand[]> = { data: [] }

    try {
      result.data = await prisma.product.findMany({
        where: {
          tags: {
            has: tag,
          },
        },
        include: {
          brand: true,
        },
        take: MAX_SLIDER_PRODUCTS,
      })
    } catch (error) {
      return { ...result, error }
    }

    return result
  },
}

export default ProductService
