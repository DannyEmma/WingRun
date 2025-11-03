import Button from '@/components/ui/Button/Button'
import styles from './ProductPage.module.css'
import Breadcrumb from '@/components/ui/Breadcrumb/Breadcrumb'
import Image from 'next/image'
import PreviewSneakers from '@/components/features/sneaker/PreviewSneakers/PreviewSneakers'
import ProductService from '@/lib/services/product'
import { Audience } from '@prisma/client'
import { BreadcrumbItem } from '@/lib/types'

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const sizes = Array(11).fill(42)
  const splits = slug.split('-')
  const id = splits[splits.length - 1]
  const { data: product } = await ProductService.getProductById(parseInt(id))
  let displayName = ''
  let displayBrand = ''
  let breadcrumbItems: BreadcrumbItem[] = []

  const audiencesToLabel = { [Audience.MEN]: 'Hommes', [Audience.WOMEN]: 'Femmes', [Audience.KIDS]: 'Enfants' }

  if (product) {
    //-- Display name --
    if (product.line) displayName += product.line + ' '
    if (product.model) displayName += product.model + ' '
    if (product.edition) displayName += product.edition + ' '
    if (product.colorway) displayName += product.colorway + ' '

    //-- Display brand --
    if (product.brand) displayBrand += product.brand

    const audienceLabel = audiencesToLabel[product.audience]

    breadcrumbItems = [
      { label: 'WingRun', url: '/' },
      { label: audienceLabel, url: '/' + audienceLabel.toLowerCase() },
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
            <p className={styles['brand']}>{displayBrand}</p>
            <p className={styles['fullname']}>{displayName}</p>
            <p className={styles['price']}>{displayPrice}</p>
          </div>

          <hr className={styles['separator']} />

          <div className={styles['sizes-container']}>
            <div className={styles['sizes-header']}>
              <p className={styles['sizes-title']}>Taille</p>
              <Button variant="link">Guide des tailles</Button>
            </div>

            <div className={styles['sizes-items']}>
              {sizes.map((size, index) => (
                <div key={index} className={`${styles['size']} ${styles['disabled']}`}>
                  {size}
                </div>
              ))}
            </div>
          </div>

          <hr className={styles['separator']} />

          <Button variant="cta-primary">Ajouter au panier</Button>

          <div className={styles['description-container']}>
            <p className={styles['description-title']}>Description</p>
            <p className={styles['description']}>
              The 2025 version of the Air Jordan 8 Retro 'Aqua' uses teal and purple hues on the foam midsole, which packs Nike Air in the forefoot and heel areas. Loyal to the
              original 1993 design, these sneakers have a black and grey nubuck upper secured with a unique cross-strap design. The signature multicolor chenille tongue tag is
              stamped with a red Jumpman logo, and a teal support panel that sports purple brush strokes.
            </p>
          </div>

          <div className={styles['reassurance-container']}>
            <div className={styles['payement-icons-container']}>
              <Image src="/images/ui/icons/paypal-icon.png" alt="Paypal Icon" width={50} height={50} />
              <Image src="/images/ui/icons/visa-icon.png" alt="Visa Icon" width={50} height={50} />
              <Image src="/images/ui/icons/mastercard-icon.png" alt="MasterCard Icon" width={50} height={50} />
            </div>
            <p>Paiement 100% sécurisé par PayPal, Visa, Mastercard.</p>
          </div>
        </div>
      </div>
    </main>
  )
}
