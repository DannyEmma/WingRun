'use client'

import { util } from '@/lib/utils'
import { Audience } from '../../../../../prisma/generated/enums'
import styles from './SearchBarFilter.module.css'

interface SearchBarFilterProps {
  setActiveAudiences: React.Dispatch<React.SetStateAction<Audience[]>>
  activeAudiences: Audience[]
}

export default function SearchBarFilter({ activeAudiences, setActiveAudiences }: SearchBarFilterProps) {
  return (
    <div className={styles['search-bar-filter']}>
      <ul className={styles['filters']}>
        <li className={`${styles['filter-item']} ${activeAudiences.length === 1 && activeAudiences[0] === Audience.MEN && styles['active']}`}>
          <button type="button" onClick={() => setActiveAudiences([Audience.MEN])}>
            Hommes
          </button>
        </li>
        <li className={`${styles['filter-item']} ${activeAudiences.length === 1 && activeAudiences[0] === Audience.WOMEN && styles['active']}`}>
          <button type="button" onClick={() => setActiveAudiences([Audience.WOMEN])}>
            Femmes
          </button>
        </li>
        <li
          className={`${styles['filter-item']} ${activeAudiences.length === 2 && util.audience.isKid(activeAudiences[0]) && util.audience.isKid(activeAudiences[1]) && styles['active']}`}
        >
          <button type="button" onClick={() => setActiveAudiences([Audience.BOY, Audience.GIRL])}>
            Enfants
          </button>
        </li>
      </ul>
    </div>
  )
}
