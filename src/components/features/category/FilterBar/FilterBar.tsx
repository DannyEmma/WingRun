'use client'

import styles from './FilterBar.module.css'
import PriceRange from '@/components/features/category/PriceRange/PriceRange'
import Button from '@/components/ui/Button/Button'
import DropDownMenu from '@/components/ui/DropDownMenu/DropDownMenu'
import { useState } from 'react'

const data = {
  brands: ['adidas', 'jordan', 'puma'],
  sizes: [41, 42, 43],
  colorsways: [
    { displayName: 'Bleu', colorIndicator: 'blue' },
    { displayName: 'Rouge', colorIndicator: 'red' },
    { displayName: 'Noir', colorIndicator: 'black' },
  ],
  sorts: ['Prix croissant', 'Prix décroissant'],
}

export default function FilterBar() {
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [activeSort, setActiveSort] = useState<string>(data.sorts[0])

  const removeOneActiveFilter = (filter: string | number) => {
    setActiveFilters((prev) => prev.filter((item) => item !== filter))
  }

  const addOneActiveFilter = (filter: string) => setActiveFilters((prev) => [...prev, filter])

  //---------- EVENTS HANDLERS ----------//
  const handleChangeFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filter = event.target.getAttribute('data-filter')

    //-- Add an active filter --
    if (event.target.checked) addOneActiveFilter(filter as string)

    //-- Remove an active filter --
    if (!event.target.checked) removeOneActiveFilter(filter as string)
  }

  //---------- RENDERED DATA ----------//

  const renderFilterItem = (filter: string | number, index: number) => (
    <label className={styles['item-filter']}>
      <input type="checkbox" onChange={handleChangeFilter} data-filter={filter} checked={activeFilters.includes(filter.toString())} />
      {filter}
    </label>
  )

  const renderActiveFilterItem = (filter: string | number, index: number) => (
    <div key={index} className={styles['active-filter']}>
      <p>{filter}</p>

      <button onClick={() => removeOneActiveFilter(filter)}>
        <svg width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L13 13M13 1L1 13" stroke="#f4efe9" strokeWidth="1.33333" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  )

  const renderColorFilterItem = (colorway: { displayName: string; colorIndicator: string }, index: number) => (
    <label key={index}>
      <div className={styles['colorway-item']}>
        <input type="checkbox" onChange={handleChangeFilter} data-filter={colorway.displayName} checked={activeFilters.includes(colorway.displayName)} />
        <div className={styles['colorway-indicator']} style={{ background: colorway.colorIndicator }}></div>
        <p className={styles['colorway']}>{colorway.displayName}</p>
      </div>
    </label>
  )

  const renderSortItem = (sort: string, index: number) => (
    <button key={index} type="button" data-sort={sort}>
      {sort}
    </button>
  )

  const brandsItemsFilter = data.brands.map(renderFilterItem)
  const colorswaysItemsFilter = data.colorsways.map(renderColorFilterItem)
  const sizesItemsFilter = data.sizes.map(renderFilterItem)
  const sortsItems = data.sorts.map(renderSortItem)

  return (
    <div className={styles['filter-bar']}>
      <div className={styles['filters-container']}>
        {/* //---------- FILTERS ----------// */}
        <div className={styles['filters']}>
          <DropDownMenu title="Marque" data={brandsItemsFilter} isHovered />
          <DropDownMenu title="Couleur" data={colorswaysItemsFilter} isHovered />
          <DropDownMenu title="Taille" data={sizesItemsFilter} isHovered />
          <DropDownMenu title="Prix" data={[<PriceRange addOneActiveFilter={addOneActiveFilter} removeOneActiveFilter={removeOneActiveFilter} />]} />
        </div>

        {/* //---------- ACTIVE FILTERS ----------// */}
        {activeFilters.length !== 0 && (
          <div className={styles['active-filters']}>
            {activeFilters.map(renderActiveFilterItem)}

            <Button variant="link" onClick={() => setActiveFilters([])}>
              Effacer tout
            </Button>
          </div>
        )}

        <p className={styles['article-number']}>240 articles</p>
      </div>

      {/* //---------- SORTS ----------// */}
      <div className={styles['sort-container']}>
        <p className={styles['sort-label']}>Trier par :</p>
        <DropDownMenu title={activeSort} data={sortsItems} insideEventHandler={{ setState: setActiveSort, eventNameAttribut: 'onClick' }} isHovered />
      </div>
    </div>
  )
}
