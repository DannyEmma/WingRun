import styles from './CategoryPage.module.css'
import Breadcrumb from '@/components/ui/Breadcrumb/Breadcrumb'
import SneakerItem from '@/components/features/sneaker/SneakerItem/SneakerItem'
import FilterBar from '@/components/features/category/FilterBar/FilterBar'
import { BreadcrumbItem } from '@/lib/types'
import PaginationRounded from '@/components/features/category/PaginationRounded/PaginationRounded'
import { PRODUCTS_PER_PAGE } from '@/lib/constants'
import { Audience } from '@/../prisma/generated/client'
import { service } from '@/lib/services'

export default async function CategoryPage({ searchParams }: { searchParams: Record<string, string> }) {
  const {
    page: currentPage = '1',
    brands: brandsParams,
    sizes: sizesParams,
    colors: colorsParams,
    priceRange: priceRangeParams,
    sort: sortParams = 'asc',
    adults: adultsParam = '',
    kids: kidsParam = '',
  } = await searchParams

  const audiencesParam = adultsParam ? adultsParam : kidsParam
  const audiences: Audience[] = audiencesParam.split(',').filter((value): value is Audience => value !== '' && Object.values(Audience).includes(value as Audience))

  const { data: colorsFilter, error: colorsFilterError } = await service.color.getColorsFilter()
  const { data: pricesRange, error: pricesRangeError } = await service.product.getPriceRangeByAudience(audiences)
  const { data: sizesList, error: sizesListError } = await service.size.getSizesByAudience(audiences)
  const { data: brandList, error: brandListError } = await service.brand.getAllBrand()

  const filters = { brands: brandsParams?.split(','), sizes: sizesParams?.split(','), colors: colorsParams?.split(','), priceRange: priceRangeParams?.split(',') }

  //-- List of products to display on the current page --
  const { data, error } = await service.product.getProductsPerPageByAudience({
    skip: (parseInt(currentPage) - 1) * PRODUCTS_PER_PAGE,
    take: PRODUCTS_PER_PAGE,
    audiences,
    filters,
    sort: sortParams,
  })

  const productPerPage = data?.products
  const pages = data?.pagination?.totalPages ?? 0
  const totalProducts = data?.pagination?.totalProducts ?? 0

  const breadcrumbItems: BreadcrumbItem[] = [{ label: 'WingRun', url: '/' }]

  return (
    <main className={styles['category-page']}>
      <Breadcrumb items={breadcrumbItems} />

      <div className={styles['title-container']}>
        <h1 className={styles['title']}>
          Sneakers <small>({totalProducts})</small>
        </h1>
        {/* <p className={styles['description']}>Découvrez la collection de sneakers {displayAudience()} chez WingRun.</p> */}
      </div>

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
