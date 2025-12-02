import Link from 'next/link'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles['main-container']}>
        <div className={styles['list-articles-container']}>
          <p className={styles['title']}>Meilleurs ventes</p>
          <ul>
            <li>
              <Link href="/">The Basement x Air Max 90 “Grappe 2025"</Link>
            </li>
            <li>
              <Link href="/">The Basement x Air Max 90 “Grappe 2025"</Link>
            </li>
            <li>
              <Link href="/">The Basement x Air Max 90 “Grappe 2025"</Link>
            </li>
            <li>
              <Link href="/">The Basement x Air Max 90 “Grappe 2025"</Link>
            </li>
            <li>
              <Link href="/">The Basement x Air Max 90 “Grappe 2025"</Link>
            </li>
          </ul>
        </div>

        <div className={styles['list-articles-container']}>
          <p className={styles['title']}>Nouveautés</p>

          <ul>
            <li>
              <Link href="/">Jordan 8 Retro 'Aqua' 2025</Link>
            </li>
            <li>
              <Link href="/">Jordan 8 Retro 'Aqua' 2025</Link>
            </li>
            <li>
              <Link href="/">Jordan 8 Retro 'Aqua' 2025</Link>
            </li>
            <li>
              <Link href="/">Jordan 8 Retro 'Aqua' 2025</Link>
            </li>
            <li>
              <Link href="/">Jordan 8 Retro 'Aqua' 2025</Link>
            </li>
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
