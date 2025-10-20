import Breadcrumb from '@/components/ui/Breadcrumb/Breadcrumb'
import styles from './CategoryPage.module.css'
import SneakerItem from '@/components/features/sneaker/SneakerItem/SneakerItem'
import FilterBar from '@/components/features/category/FilterBar/FilterBar'
import ProductService from '@/lib/services/product'
import { Audience } from '@prisma/client'

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params
  const categoryToAudience: Record<string, Audience> = { hommes: Audience.MEN, femmes: Audience.WOMEN, enfants: Audience.KIDS }

  const products = (await ProductService.getProductByAudience(categoryToAudience[category])).data

  return (
    <main className={styles['category-page']}>
      {/* //---------- TITLE  ----------// */}
      <div className={styles['title-container']}>
        <div className={styles['title-content']}>
          <h1 className={styles['title']}>{category}</h1>
        </div>
        <p className={styles['description']}>Découvrez la collection de sneakers pour homme chez WingRun.</p>
      </div>

      <Breadcrumb />

      {/* //---------- FILTER BAR ----------// */}
      <FilterBar nbProduct={products.length} />

      {/* //----------  SNEAKERS GRID ----------// */}
      <div className={styles['sneakers-grid']}>
        {products.map((product, index) => (
          <SneakerItem key={index} sneaker={product} />
        ))}
      </div>
    </main>
  )
}
