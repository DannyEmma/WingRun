import styles from './CategoryPage.module.css'
import Breadcrumb from '@/components/ui/Breadcrumb/Breadcrumb'
import SneakerItem from '@/components/features/sneaker/SneakerItem/SneakerItem'
import FilterBar from '@/components/features/category/FilterBar/FilterBar'
import ProductService from '@/lib/services/product'
import { Adult, BreadcrumbItem, Kid } from '@/lib/types'
import PaginationRounded from '@/components/features/category/PaginationRounded/PaginationRounded'
import { PRODUCTS_PER_PAGE } from '@/lib/constants'
import ColorFilterService from '@/lib/services/colorFilter'
import SizeService from '@/lib/services/size'
import BrandService from '@/lib/services/brand'
import { Audience } from '@prisma/client'
import { displayAudience } from '@/utils/audience'

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
  // const audiences: Adult[] | Kid[] = audiencesParam.split(',').filter((value) => value !== '' && Object.values(Audience).includes(value as Audience))

  const colorsFilter = (await ColorFilterService.getColorsFilter()).data
  const pricesRange = (await ProductService.getPriceRangeByAudience(audiences)).data
  const sizesList = (await SizeService.getSizesByAudience(audiences)).data
  const brandList = (await BrandService.getAllBrand()).data

  const filters = { brands: brandsParams?.split(','), sizes: sizesParams?.split(','), colors: colorsParams?.split(','), priceRange: priceRangeParams?.split(',') }

  //-- List of products to display on the current page --
  const result = await ProductService.getProductsPerPageByAudience({
    skip: (parseInt(currentPage) - 1) * PRODUCTS_PER_PAGE,
    take: PRODUCTS_PER_PAGE,
    audiences,
    filters,
    sort: sortParams,
  })

  const productPerPage = result.data
  const pages = result.pagination?.totalPages ?? 0
  const totalProducts = result.pagination?.totalProducts ?? 0

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'WingRun', url: '/' },
    // { label: displayAudience(audiences), url: null },
  ]

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
      <FilterBar brandList={brandList} colorsFilter={colorsFilter} pricesRange={pricesRange} sizesList={sizesList} />

      {/* //----------  SNEAKERS GRID ----------// */}
      <div className={styles['sneakers-grid']}>{productPerPage && productPerPage.map((product, index) => <SneakerItem key={index} sneaker={product} />)}</div>

      {pages > 1 && <PaginationRounded pages={pages} />}
    </main>
  )
}
