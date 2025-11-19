import Button from '@/components/ui/Button/Button'
import styles from './ProductPage.module.css'
import Breadcrumb from '@/components/ui/Breadcrumb/Breadcrumb'
import Image from 'next/image'
import PreviewSneakers from '@/components/features/sneaker/PreviewSneakers/PreviewSneakers'
import ProductService from '@/lib/services/product'
import { Audience } from '@prisma/client'
import { BreadcrumbItem } from '@/lib/types'
import { categoryToAudience } from '@/utils/category'
import SizeService from '@/lib/services/size'
import SizeGuide from '@/components/features/article/SizeGuide/SizeGuide'

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const splits = slug.split('-')
  const productId = parseInt(splits[splits.length - 1])
  const product = (await ProductService.getProductById(productId)).data
  const sizesStock = (await ProductService.getSizesStock(productId)).data

  const audience = product?.audience

  const sizes = audience ? (await SizeService.getSizesByAudience([audience])).data : []

  let displayName = ''
  let breadcrumbItems: BreadcrumbItem[] = []

  const audiencesToLabel = { [Audience.MEN]: 'Hommes', [Audience.WOMEN]: 'Femmes', [Audience.BOY]: 'Garçon', [Audience.GIRL]: 'Fille' }

  if (product) {
    //-- Display name --
    if (product.line) displayName += product.line + ' '
    if (product.model) displayName += product.model + ' '
    if (product.edition) displayName += product.edition + ' '
    if (product.colorway) displayName += product.colorway + ' '

    const audienceLabel = audiencesToLabel[product.audience as keyof typeof audiencesToLabel]

    breadcrumbItems = [
      { label: 'WingRun', url: '/' },
      { label: audienceLabel, url: '/collections/' + audienceLabel.toLowerCase() },
      { label: displayName, url: null },
    ]
  }

  const price = (product?.price ?? 0) / 100
  const displayPrice = price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })

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
            <p className={styles['fullname']}>{displayName}</p>
            <p className={styles['price']}>{displayPrice}</p>
          </div>

          <hr className={styles['separator']} />

          <div className={styles['sizes-container']}>
            <div className={styles['sizes-header']}>
              <p className={styles['sizes-title']}>Taille</p>
              <SizeGuide trigger={<Button variant="link">Guide des tailles</Button>} />
            </div>

            <div className={styles['sizes-items']}>
              {sizes.map((size, index) => (
                <div key={index} className={`${styles['size']} ${!sizesStock.includes(size) && styles['disabled']}`}>
                  {size}
                </div>
              ))}
            </div>
          </div>

          <hr className={styles['separator']} />

          <Button variant="cta-primary">Ajouter au panier</Button>

          <div className={styles['reassurance-container']}>
            <div className={styles['payement-icons-container']}>
              <Image src="/images/ui/icons/paypal-icon.png" alt="Paypal Icon" width={50} height={50} />
              <Image src="/images/ui/icons/visa-icon.png" alt="Visa Icon" width={50} height={50} />
              <Image src="/images/ui/icons/mastercard-icon.png" alt="MasterCard Icon" width={50} height={50} />
            </div>
            <p>Paiement 100% sécurisé par PayPal, Visa, Mastercard.</p>
          </div>

          <div className={styles['description-container']}>
            <p className={styles['description-title']}>Description</p>
            <p className={styles['description']}>{product?.description}</p>
          </div>
        </div>
      </div>
    </main>
  )
}
