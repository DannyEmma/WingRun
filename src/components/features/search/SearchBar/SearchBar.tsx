'use client'

import styles from './SearchBar.module.css'
import { useEffect, useRef, useState } from 'react'
import SneakerItem from '@/components/features/sneaker/SneakerItem/SneakerItem'
import SearchBarFilter from '@/components/features/search/SearchBarFilter/SearchBarFilter'
import { useRouter } from 'next/navigation'
import { PRODUCTS_PER_SEARCH } from '@/lib/constants'
import CTA from '@/components/ui/CTA/CTA'
import { Audience } from '@/../prisma/generated/enums'
import { util } from '@/lib/utils'
import { action } from '@/lib/actions'

interface SearchBarProps {
  close: () => void
  brands: string[] | null
}

export default function SearchBar({ close, brands }: SearchBarProps) {
  const router = useRouter()
  const searchBarRef = useRef<HTMLDivElement>(null)
  const [activeAudience, setActiveAudience] = useState('hommes')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchProducts, setSearchProducts] = useState<{ products: any[]; count: number } | null>({ products: [], count: 0 })
  const [isOpen, setIsOpen] = useState(false)
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    setIsOpen(true)
  }, [])

  //---------- Get Data ----------//
  useEffect(() => {
    ;(async () => {
      const { data: searchProducts, error } = await action.search.getSearchProductsAction(util.audience.labelToAudience(activeAudience), searchQuery)
      setSearchProducts(searchProducts)
    })()
  }, [activeAudience])

  //---------- METHODS ----------//
  const highlight = (text: string) => {
    const searchQueryArray = searchQuery.split(' | ')
    const needHighlight = searchQueryArray.some((word) => text.toLowerCase().includes(word.toLowerCase()))

    return needHighlight ? <strong>{text}</strong> : text
  }

  //---------- EVENTS HANDLERS ----------//
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    //-- xx | xx | xx - This format of search is use by prisma FTS (Full-Text-Seach) --
    const searchQuery = e.target.value
      .split(' ')
      .filter((value) => value !== '')
      .join(' | ')

    //-- Delete the timeout in progress --
    if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current)

    //-- Debounce --
    timeoutIdRef.current = setTimeout(async () => {
      const { data: searchProducts, error } = await action.search.getSearchProductsAction(util.audience.labelToAudience(activeAudience), searchQuery)
      setSearchProducts(searchProducts)
      setSearchQuery(searchQuery)
    }, 400)
  }

  const handleClickBrand = (brand: string) => {
    const audience: Audience = util.audience.labelToAudience(activeAudience)
    const audienceParam = audience === Audience.KIDS ? 'kids=BOY,GIRL' : `adults=${audience}`

    router.push(`/collections?${audienceParam}&brands=${brand}`)
    handleClose()
  }

  const handleClickSeeMoreResults = () => {
    router.push(`/search/results?q=${searchQuery.replaceAll(' | ', '+')}&category=${activeAudience}`)
    handleClose()
  }

  const handleClose = () => {
    document.body.style.overflow = 'auto'
    setIsOpen(false)
  }

  return (
    <div ref={searchBarRef} className={`${styles['search-bar']} ${isOpen ? styles.open : ''}`} onTransitionEnd={() => !isOpen && close()}>
      <div className={styles['container']}>
        {/* //---------- SEARCH ----------// */}
        <div className={styles['search-container']}>
          <label htmlFor="search">
            <svg className={styles['search-icon']} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M7.91029 13.8426C8.68934 13.8426 9.46076 13.6892 10.1805 13.3911C10.9003 13.0929 11.5542 12.656 12.1051 12.1051C12.656 11.5542 13.0929 10.9002 13.3911 10.1805C13.6892 9.46075 13.8426 8.68933 13.8426 7.91029C13.8426 7.13124 13.6892 6.35982 13.3911 5.64008C13.0929 4.92033 12.656 4.26636 12.1051 3.71549C11.5542 3.16462 10.9003 2.72765 10.1805 2.42952C9.46076 2.13139 8.68934 1.97794 7.91029 1.97794C6.33694 1.97794 4.82802 2.60296 3.71549 3.71549C2.60296 4.82802 1.97795 6.33693 1.97795 7.91029C1.97795 9.48364 2.60296 10.9926 3.71549 12.1051C4.82802 13.2176 6.33694 13.8426 7.91029 13.8426ZM14.159 12.761L17.6987 16.3006C17.793 16.3919 17.8683 16.501 17.92 16.6217C17.9717 16.7424 17.9989 16.8721 18 17.0034C18.001 17.1347 17.9759 17.2648 17.9261 17.3863C17.8763 17.5078 17.8028 17.6181 17.7099 17.7109C17.617 17.8037 17.5066 17.877 17.385 17.9266C17.2635 17.9763 17.1333 18.0012 17.002 18C16.8707 17.9987 16.741 17.9714 16.6204 17.9195C16.4998 17.8676 16.3908 17.7922 16.2996 17.6977L12.76 14.158C11.1706 15.3918 9.17071 15.9735 7.16752 15.7847C5.16432 15.5959 3.30838 14.6507 1.9775 13.1417C0.646626 11.6326 -0.0591376 9.67313 0.00388472 7.66204C0.0669071 5.65096 0.893978 3.73948 2.31673 2.31673C3.73948 0.893977 5.65096 0.066907 7.66205 0.00388471C9.67314 -0.0591376 11.6327 0.646625 13.1417 1.9775C14.6507 3.30838 15.5959 5.16432 15.7847 7.16751C15.9735 9.17071 15.3918 11.1706 14.158 12.76L14.159 12.761Z"
                fill="#514E49"
              />
            </svg>
          </label>

          <input id="search" onChange={handleSearch} className={styles['search-input']} type="text" placeholder={'Recherche pour ' + activeAudience} />

          <button type="button" onClick={handleClose}>
            <svg className={styles['close-icon']} width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L13 13M13 1L1 13" stroke="#514E49" strokeWidth="1.33333" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <hr className={styles['separator']} />

        {/* //---------- MENU ----------// */}
        <div className={styles['menu']}>
          <div className={styles['left-section']}>
            <h2 className={styles['left-section-title']}>Nos Marques</h2>

            <ul className={styles['brands-list']}>
              {brands &&
                brands.map((brand, index) => {
                  const displayBrand = brand.replaceAll('_', ' ').toLowerCase()

                  return (
                    <li key={index} className={styles['brand-item']}>
                      <button type="button" onClick={() => handleClickBrand(brand)}>
                        {displayBrand}
                      </button>
                    </li>
                  )
                })}
            </ul>
          </div>

          <div className={styles['right-section']}>
            <SearchBarFilter activeAudience={activeAudience} setActiveAudience={setActiveAudience} />

            <h2 className={styles['right-section-title']}>Correspondances trouvées</h2>

            {searchProducts ? (
              <div className={styles['sneakers-grid']}>
                {searchProducts.products.map((sneaker, index) => (
                  <div key={index} onClick={handleClose} className={styles['sneaker-container']}>
                    <SneakerItem variant="search" data={sneaker} highlight={highlight} />
                  </div>
                ))}
              </div>
            ) : (
              <p className={styles['no-result']}>Aucun résultat.</p>
            )}

            {searchProducts && searchProducts.count > PRODUCTS_PER_SEARCH && (
              <div className={styles['see-more-result-button-container']}>
                <CTA onClick={handleClickSeeMoreResults} variant="primary" fit>
                  Voir l'ensemble des {searchProducts.count} produits
                </CTA>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
