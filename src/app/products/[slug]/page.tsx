import styles from './ProductPage.module.css'
import Breadcrumb from '@/components/ui/Breadcrumb/Breadcrumb'
import PreviewSneakers from '@/components/features/sneaker/PreviewSneakers/PreviewSneakers'
import { BreadcrumbItem } from '@/lib/types'
import PurchaseContainer from '@/components/features/article/PurchaseContainer/PurchaseContainer'
import { notFound } from 'next/navigation'
import { service } from '@/lib/services'
import { util } from '@/lib/utils'

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  //-- Product --
  const productId = util.product.getIdFromSlug(slug)
  const product = (await service.product.getProductById(productId)).data

  //-- ERROR PAGE 404 --
  if (!product) notFound()

  //-- Some data --
  const audience = product.audience
  const { data: sizesStock, error: sizesStockError } = await service.product.getSizesStock(productId)
  const { data: sizes, error: sizesError } = audience && (await service.size.getSizesByAudience([audience]))
  const fullname = util.product.getFullname(product)
  const formattedPrice = util.product.getFormattedPrice(product.price)

  //-- Breadcrumb --
  const audienceLabel = util.audience.audienceToLabel(audience)
  let breadcrumbItems: BreadcrumbItem[] = [
    { label: 'WingRun', url: '/' },
    { label: audienceLabel, url: '/collections' + audienceLabel.toLowerCase() },
    { label: fullname, url: null },
  ]

  return (
    <main className={styles['article-page']}>
      <Breadcrumb items={breadcrumbItems} />
      <div className={styles['article-container']}>
        {/* //---------- PREVIEW CONTAINER ----------// */}
        <div className={styles['preview-container']}>{product?.visuals && <PreviewSneakers images={product.visuals} />}</div>

        {/* //---------- BUY BOX CONTAINER ----------// */}
        <div className={styles['buy-box-container']}>
          <div className={styles['buy-box-header']}>
            <p className={styles['brand']}>{product?.brand && product.brand.name.replaceAll('_', ' ')}</p>
            <p className={styles['fullname']}>{fullname}</p>
            <p className={styles['price']}>{formattedPrice}</p>
          </div>

          <hr className={styles['separator']} />

          <PurchaseContainer
            sizes={sizes}
            sizesStock={sizesStock}
            sneaker={{
              id: product.id,
              line: product.line,
              model: product.model,
              image: product.image,
              brand: product.brand,
              price: product.price,
              year: product.year,
              colorway: product.colorway,
              edition: product.edition,
              colorFilter: product.colorFilter,
            }}
          />

          <div className={styles['description-container']}>
            <p className={styles['description-title']}>Description</p>
            <p className={styles['description']}>{product?.description}</p>
          </div>
        </div>
      </div>
    </main>
  )
}
