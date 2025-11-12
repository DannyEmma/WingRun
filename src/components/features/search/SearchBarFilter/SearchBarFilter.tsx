'use client'

import styles from './SearchBarFilter.module.css'

interface SearchBarFilterProps {
  setActiveAudience: React.Dispatch<React.SetStateAction<string>>
  activeAudience: string
}

export default function SearchBarFilter({ activeAudience, setActiveAudience }: SearchBarFilterProps) {
  return (
    <div className={styles['search-bar-filter']}>
      <ul className={styles['filters']}>
        <li className={`${styles['filter-item']} ${activeAudience === 'hommes' && styles['active']}`}>
          <button type="button" onClick={() => setActiveAudience('hommes')}>
            Homme
          </button>
        </li>
        <li className={`${styles['filter-item']} ${activeAudience === 'femmes' && styles['active']}`}>
          <button type="button" onClick={() => setActiveAudience('femmes')}>
            Femme
          </button>
        </li>
        <li className={`${styles['filter-item']} ${activeAudience === 'enfants' && styles['active']}`}>
          <button type="button" onClick={() => setActiveAudience('enfants')}>
            Enfant
          </button>
        </li>
      </ul>
    </div>
  )
}
