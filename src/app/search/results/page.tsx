import Breadcrumb from '@/components/ui/Breadcrumb/Breadcrumb'
import styles from './SearchResultsPage.module.css'
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

export default async function SearchResultsPage({ searchParams }: { searchParams: Record<string, string> }) {
  const {
    q: query,
    category: categoryParam = 'hommes',
    page: currentPage = '1',
    brands: brandsParams,
    sizes: sizesParams,
    colors: colorsParams,
    priceRange: priceRangeParams,
    sort: sortParams = 'asc',
  } = await searchParams

  const audience = categoryToAudience[categoryParam]

  const colorsFilter = (await ColorFilterService.getColorsFilter()).data
  const pricesRange = (await ProductService.getPriceRangeByAudience(audience)).data
  const sizesList = (await SizeService.getSizesByAudience(audience)).data
  const brandList = (await BrandService.getAllBrand()).data

  const filters = { brands: brandsParams?.split(','), sizes: sizesParams?.split(','), colors: colorsParams?.split(','), priceRange: priceRangeParams?.split(',') }

  const data = (
    await ProductService.getProductsPerPageBySearchQuery({
      searchQuery: query
        .split(' ')
        .filter((v) => v !== '')
        .join(' | '),
      audience,
      skip: (parseInt(currentPage) - 1) * PRODUCTS_PER_PAGE,
      take: PRODUCTS_PER_PAGE,
      filters,
      sort: sortParams,
    })
  ).data

  const productPerPage = data.products

  const pages = data.pagination.totalPages
  const totalProducts = data.count

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'WingRun', url: '/' },
    { label: `Résultats pour "${query}"`, url: null },
  ]

  return (
    <main className={styles['category-page']}>
      {/* //---------- TITLE  ----------// */}
      <div className={styles['title-container']}>
        <div className={styles['title-content']}>
          <h1 className={styles['title']}>{`"${query.replaceAll('_', ' ')}"`}</h1>
        </div>
      </div>

      <Breadcrumb items={breadcrumbItems} />

      {/* //---------- FILTER BAR ----------// */}
      <FilterBar totalProducts={totalProducts} brandList={brandList} colorsFilter={colorsFilter} pricesRange={pricesRange} sizesList={sizesList} />

      {/* //----------  SNEAKERS GRID ----------// */}
      <div className={styles['sneakers-grid']}>
        {productPerPage && productPerPage.map((product, index) => <SneakerItem key={index} sneaker={product} category={categoryParam} />)}
      </div>

      {pages > 1 && <PaginationRounded pages={pages} />}
    </main>
  )
}
