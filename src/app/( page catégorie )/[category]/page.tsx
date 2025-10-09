import Breadcrumb from '@/components/ui/Breadcrumb/Breadcrumb'
import styles from './CategoryPage.module.css'
import SneakerItem from '@/components/features/sneaker/SneakerItem/SneakerItem'
import FilterBar from '@/components/features/category/FilterBar/FilterBar'

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params
  const sneaker = {
    id: 1234,
    brand: 'Jordan',
    line: 'Air Jordan',
    model: '4',
    variant: null,
    colorway: 'Cave Stone',
    year: null,
    price_cents: 20000,
  }

  return (
    <main className={styles['category-page']}>
      <Breadcrumb />

      {/* //---------- TITLE  ----------// */}
      <div className={styles['title-container']}>
        <div className={styles['title-content']}>
          <h1 className={styles['title']}>{category}</h1>
          <p className={styles['article-number']}>(240 articles)</p>
        </div>
        <p className={styles['description']}>Découvrez la collection de sneakers pour homme chez WingRun.</p>
      </div>

      {/* //---------- FILTER BAR ----------// */}
      <FilterBar />

      {/* //----------  SNEAKERS GRID ----------// */}
      <div className={styles['sneakers-grid']}>
        <SneakerItem sneaker={sneaker} />
        <SneakerItem sneaker={sneaker} />
        <SneakerItem sneaker={sneaker} />
        <SneakerItem sneaker={sneaker} />
        <SneakerItem sneaker={sneaker} />
        <SneakerItem sneaker={sneaker} />
        <SneakerItem sneaker={sneaker} />
        <SneakerItem sneaker={sneaker} />
        <SneakerItem sneaker={sneaker} />
      </div>
    </main>
  )
}
