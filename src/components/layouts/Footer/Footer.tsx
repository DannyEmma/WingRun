import Link from 'next/link'
import styles from './Footer.module.css'
import { ProductWithBrand } from '@/lib/types/_internals/product'
import { service } from '@/lib/services'
import { util } from '@/lib/utils'

export default async function Footer() {
  const [bestSellers, newArrivals] = await Promise.all([
    service.product.getProductsByTag('BEST_SELLER', 5).then((res) => res.data),
    service.product.getProductsByTag('NEW_ARRIVAL', 5).then((res) => res.data),
  ])

  return (
    <footer className={styles.footer}>
      <div className={styles['main-container']}>
        <div className={styles['list-articles-container']}>
          <p className={styles['title']}>Meilleurs ventes</p>
          <ul>
            {bestSellers &&
              bestSellers.map((product: ProductWithBrand, index) => (
                <li key={index}>
                  <Link href="/">{util.product.getFullname(product)}</Link>
                </li>
              ))}
          </ul>
        </div>

        <div className={styles['list-articles-container']}>
          <p className={styles['title']}>Nouveautés</p>

          <ul>
            {newArrivals &&
              newArrivals.map((product: ProductWithBrand, index) => (
                <li key={index}>
                  <Link href="/">{util.product.getFullname(product)}</Link>
                </li>
              ))}
          </ul>
        </div>

        <div className={styles['newsletter-container']}>
          <p className={styles['title']}>WingRun Newsletter</p>
          <p>Ne manquez aucune de nos dernières nouveautés.</p>
          <div className={styles['newsletter-input-container']}>
            <input type="text" placeholder="E-mail" />
            <button>S'inscrire</button>
          </div>
        </div>
      </div>

      <div className={styles['copyright-container']}>
        <p className={styles['copyright']}>© WingRun - Tous droits réservés | Projet fictif - non affilié aux marques.</p>
        <ul className={styles['links']}>
          <li>
            <Link href="/legal-notices">Mentions légales</Link>
          </li>
          <li>
            <Link href="/privacy-policy">Politique de confidentialité</Link>
          </li>
          <li>
            <Link href="/terms-of-sale">Conditions générales de vente</Link>
          </li>
        </ul>
      </div>
    </footer>
  )
}
