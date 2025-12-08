'use client'

import Link from 'next/link'
import styles from './Footer.module.css'
import { ProductWithBrand } from '@/lib/types/_internals/product'
import { util } from '@/lib/utils'
import { toast } from 'sonner'

interface FooterProps {
  bestSellers: ProductWithBrand[] | null
  newArrivals: ProductWithBrand[] | null
}
export default function Footer({ bestSellers, newArrivals }: FooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={styles['main-container']}>
        <div className={styles['list-articles-container']}>
          <p className={styles['title']}>Meilleurs ventes</p>
          <ul>
            {bestSellers &&
              bestSellers.map((product: ProductWithBrand, index) => (
                <li key={index}>
                  <Link href={util.product.getPageUrl(product)}>{util.product.getFullname(product)}</Link>
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
                  <Link href={util.product.getPageUrl(product)}>{util.product.getFullname(product)}</Link>
                </li>
              ))}
          </ul>
        </div>

        <div className={styles['newsletter-container']}>
          <p className={styles['title']}>WingRun Newsletter</p>
          <p>Ne manquez aucune de nos dernières nouveautés.</p>
          <div className={styles['newsletter-input-container']}>
            <input type="email" placeholder="E-mail" required />
            <button onClick={() => toast.success('Newsletter', { description: 'Inscription réussie à la newsletter WingRun.' })}>S'inscrire</button>
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
