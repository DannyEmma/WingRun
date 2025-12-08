import { PRODUCTS_PER_PAGE, PRODUCTS_PER_SEARCH } from '@/lib/constants'
import prisma from '@/lib/prisma'
import { ServiceResponse } from '@/lib/types'
import { ProductWithBrand, ProductWithBrandAndColorFilter } from '@/lib/types/_internals/product'
import { Audience, ProductTag } from '@/../prisma/generated/enums'

export class ProductService {
  async getProductById(id: number): Promise<ServiceResponse<ProductWithBrandAndColorFilter>> {
    let response: ServiceResponse<ProductWithBrandAndColorFilter> = { data: null, error: null }

    try {
      response.data = await prisma.product.findUnique({ where: { id }, include: { brand: true, colorFilter: true } })
    } catch (error) {
      if (error instanceof Error) response.error = error.message
    }

    return response
  }

  async getPriceRangeByAudience(audiences: Audience[]): Promise<ServiceResponse<[number, number]>> {
    let response: ServiceResponse<[number, number]> = { data: null, error: null }

    try {
      const result = await prisma.product.aggregate({ _min: { price: true }, _max: { price: true }, where: { ...(audiences.length && { audience: { in: audiences } }) } })
      const min = result._min.price ? result._min.price / 100 : NaN
      const max = result._max.price ? result._max.price / 100 : NaN

      response.data = [min, max]
    } catch (error) {
      if (error instanceof Error) response.error = error.message
    }
    return response
  }

  async getProductsByTag(tag: ProductTag, limit: number): Promise<ServiceResponse<ProductWithBrand[]>> {
    let response: ServiceResponse<ProductWithBrand[]> = { data: null, error: null }

    try {
      response.data = await prisma.product.findMany({
        where: {
          tags: {
            has: tag,
          },
        },
        include: {
          brand: true,
        },
        take: limit,
      })
    } catch (error) {
      if (error instanceof Error) response.error = error.message
    }

    return response
  }

  async getSizesStock(productId: number): Promise<ServiceResponse<string[]>> {
    let response: ServiceResponse<string[]> = { data: null, error: null }

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
      response.data = result.map((productSize) => productSize.size.size)
    } catch (error) {
      if (error instanceof Error) response.error = error.message
    }

    return response
  }

  async getProductsPerPageByAudience({
    page,
    audiences,
    filters,
    sort,
    tag,
  }: {
    page: number
    audiences: Audience[]
    filters: Record<string, any[] | null>
    sort: string
    tag: ProductTag | null | undefined
  }): Promise<ServiceResponse<{ products: ProductWithBrand[] | null; pagination: Record<string, number> }>> {
    let response: ServiceResponse<{ products: ProductWithBrand[] | null; pagination: Record<string, number> }> = { data: null, error: null }
    let productsPerPage = null
    let totalProducts = 0

    try {
      productsPerPage = await prisma.product.findMany({
        skip: (page - 1) * PRODUCTS_PER_PAGE,
        take: PRODUCTS_PER_PAGE,
        where: {
          ...(tag && { tags: { has: tag } }),
          ...(audiences.length && { audience: { in: audiences } }),
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

      totalProducts = (
        await prisma.product.aggregate({
          where: {
            ...(tag && { tags: { has: tag } }),
            ...(audiences.length && { audience: { in: audiences } }),
            ...(filters.brands?.length && { brand: { name: { in: filters.brands } } }),
            ...(filters.colors?.length && { colorFilter: { color: { in: filters.colors } } }),
            ...(filters.sizes?.length && { sizes: { some: { size: { size: { in: filters.sizes } }, stock: { not: 0 } } } }),
            ...(filters.priceRange?.length && { price: { gte: filters.priceRange[0] * 100, lte: filters.priceRange[1] * 100 } }),
          },
          _count: { _all: true },
        })
      )._count._all
    } catch (error) {
      if (error instanceof Error) response.error = error.message
    }

    const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE)

    response.data = { products: productsPerPage, pagination: { totalPages, totalProducts } }

    return response
  }

  async getSearchProducts(audiences: Audience[], searchQuery: string): Promise<ServiceResponse<{ products: ProductWithBrand[]; count: number }>> {
    let response: ServiceResponse<{ products: ProductWithBrand[]; count: number }> = { data: null, error: null }

    try {
      const promise1 = prisma.product.findMany({
        where: {
          audience: { in: audiences },
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
          audience: { in: audiences },
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

      response.data = { products, count: count._count._all }
    } catch (error) {
      if (error instanceof Error) response.error = error.message
    }

    return response
  }

  async getProductsPerPageBySearchQuery({
    page,
    audiences,
    searchQuery,
    filters,
    sort,
  }: {
    page: number
    searchQuery: string
    audiences: Audience[]
    filters: Record<string, any[] | null>
    sort: string
  }): Promise<ServiceResponse<{ products: ProductWithBrand[]; count: number; pagination: { totalPages: number } }>> {
    let response: ServiceResponse<{ products: ProductWithBrand[]; count: number; pagination: { totalPages: number } }> = { data: null, error: null }

    try {
      //-- Products to one page --
      const promise1 = prisma.product.findMany({
        where: {
          ...(audiences.length && { audience: { in: audiences } }),
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
        take: PRODUCTS_PER_PAGE,
        skip: (page - 1) * PRODUCTS_PER_PAGE,
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
          ...(audiences.length && { audience: { in: audiences } }),
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

      response.data = { products, count, pagination: { totalPages: Math.ceil(count / PRODUCTS_PER_PAGE) } }
    } catch (error) {
      if (error instanceof Error) response.error = error.message
    }

    return response
  }
}
