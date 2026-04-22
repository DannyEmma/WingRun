import Breadcrumb from '@/components/ui/Breadcrumb/Breadcrumb'
import styles from './SearchResultsPage.module.css'
import SneakerItem from '@/components/features/sneaker/SneakerItem/SneakerItem'
import FilterBar from '@/components/features/category/FilterBar/FilterBar'
import { BreadcrumbItem } from '@/lib/types'
import PaginationRounded from '@/components/features/category/PaginationRounded/PaginationRounded'
import { service } from '@/lib/services'
import { Audience } from '../../../../prisma/generated/enums'

export default async function SearchResultsPage({ searchParams }: { searchParams: Record<string, string> }) {
  const {
    q: query,
    adults: adutlsParam,
    kids: kidsParam,
    page: currentPage = '1',
    brands: brandsParams,
    sizes: sizesParams,
    colors: colorsParams,
    priceRange: priceRangeParams,
    sort: sortParams = 'asc',
  } = await searchParams

  const audiences: Audience[] = (adutlsParam?.split(',').filter((v) => v !== ',') as Audience[]) || (kidsParam?.split(',').filter((v) => v !== ',') as Audience[]) || []

  const [colorsFilter, pricesRange, sizesList, brandList] = await Promise.all([
    service.color.getColorsFilter().then((res) => res.data),
    service.product.getPriceRangeByAudience(audiences).then((res) => res.data),
    service.size.getSizesByAudience(audiences).then((res) => res.data),
    service.brand.getAllBrand().then((res) => res.data),
  ])

  const filters = { brands: brandsParams?.split(','), sizes: sizesParams?.split(','), colors: colorsParams?.split(','), priceRange: priceRangeParams?.split(',') }

  const { data, error } = await service.product.getProductsPerPageBySearchQuery({
    page: Number(currentPage),
    searchQuery: query
      .split(' ')
      .filter((v) => v !== '')
      .join(' | '),
    audiences,
    filters,
    sort: sortParams,
  })

  const productPerPage = data?.products

  const pages = data?.pagination.totalPages ?? 0

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
      {brandList && colorsFilter && pricesRange && sizesList && (
        <FilterBar brandList={brandList} colorsFilter={colorsFilter} pricesRange={pricesRange} sizesList={sizesList?.map((s) => s.size)} />
      )}

      {/* //----------  SNEAKERS GRID ----------// */}
      <div className={styles['sneakers-grid']}>{productPerPage && productPerPage.map((product, index) => <SneakerItem key={index} data={product} />)}</div>

      {pages > 1 && <PaginationRounded pages={pages} />}
    </main>
  )
}
