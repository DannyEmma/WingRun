import Breadcrumb from '@/components/ui/Breadcrumb/Breadcrumb'
import styles from './CategoryPage.module.css'
import SneakerItem from '@/components/features/sneaker/SneakerItem/SneakerItem'
import FilterBar from '@/components/features/category/FilterBar/FilterBar'
import ProductService from '@/lib/services/product'
import { BreadcrumbItem } from '@/lib/types'
import PaginationRounded from '@/components/features/category/PaginationRounded/PaginationRounded'
import { PRODUCTS_PER_PAGE } from '@/lib/constants'
import ColorFilterService from '@/lib/services/colorFilter'
import SizeService from '@/lib/services/size'
import { categoryToAudience } from '@/utils/category'
import BrandService from '@/lib/services/brand'

export default async function CategoryPage({ params, searchParams }: { params: Promise<{ category: string }>; searchParams: Record<string, string> }) {
  const { category } = await params
  const { page: currentPage = '1', brands: brandsParams, sizes: sizesParams, colors: colorsParams, priceRange: priceRangeParams, sort: sortParams = 'asc' } = await searchParams

  const audience = categoryToAudience[category]
  const colorsFilter = (await ColorFilterService.getColorsFilter()).data
  const pricesRange = (await ProductService.getPriceRangeByAudience(audience)).data
  const sizesList = (await SizeService.getSizesByAudience(audience)).data
  const brandList = (await BrandService.getAllBrand()).data

  const filters = { brands: brandsParams?.split(','), sizes: sizesParams?.split(','), colors: colorsParams?.split(','), priceRange: priceRangeParams?.split(',') }

  //-- List of products to display on the current page --
  const result = await ProductService.getProductsPerPageByAudience({
    skip: (parseInt(currentPage) - 1) * PRODUCTS_PER_PAGE,
    take: PRODUCTS_PER_PAGE,
    audience,
    filters,
    sort: sortParams,
  })

  const productPerPage = result.data
  const pages = result.pagination?.totalPages ?? 0
  const totalProducts = result.pagination?.totalProducts ?? 0

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'WingRun', url: '/' },
    { label: category, url: null },
  ]

  return (
    <main className={styles['category-page']}>
      {/* //---------- TITLE  ----------// */}
      <div className={styles['title-container']}>
        <div className={styles['title-content']}>
          <h1 className={styles['title']}>{category}</h1>
        </div>
        <p className={styles['description']}>Découvrez la collection de sneakers pour homme chez WingRun.</p>
      </div>

      <Breadcrumb items={breadcrumbItems} />

      {/* //---------- FILTER BAR ----------// */}
      <FilterBar brandList={brandList} colorsFilter={colorsFilter} pricesRange={pricesRange} sizesList={sizesList} totalProducts={totalProducts} />

      {/* //----------  SNEAKERS GRID ----------// */}
      <div className={styles['sneakers-grid']}>{productPerPage && productPerPage.map((product, index) => <SneakerItem key={index} sneaker={product} category={category} />)}</div>

      {pages > 1 && <PaginationRounded pages={pages} />}
    </main>
  )
}
