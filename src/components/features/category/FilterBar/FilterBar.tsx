'use client'

import styles from './FilterBar.module.css'
import PriceRange from '@/components/features/category/PriceRange/PriceRange'
import Button from '@/components/ui/Button/Button'
import DropDownMenu from '@/components/ui/DropDownMenu/DropDownMenu'
import { Filter, Sort } from '@/lib/types'
import { Brand, ColorFilter } from '@prisma/client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

type FiltersData = {
  brands: Filter[]
  sizes: Filter[]
  colors: Filter[]
  priceRange: Filter[]
}

interface FilterBarProps {
  totalProducts: number
  colorsFilter: ColorFilter[]
  pricesRange: number[]
  sizesList: string[]
}

const sortData: Sort[] = [
  { value: 'asc', name: 'Prix croissant' },
  { value: 'desc', name: 'Prix décroissant' },
]

export default function FilterBar({ totalProducts, colorsFilter, pricesRange, sizesList }: FilterBarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  //---------- STATE ----------//
  const [filtersData, setFiltersData] = useState<FiltersData>({ brands: [], sizes: [], colors: [], priceRange: [] })
  const [activeFilters, setActiveFilters] = useState<Filter[]>([])
  const [activeSort, setActiveSort] = useState<Sort | null>(null)

  //---------- METHODS ----------//
  const removeAllUrlFilter = () => router.push(pathname)

  const addUrlParamSort = (sort: Sort) => {
    //-- Prepare the new url --
    const newURL = new URLSearchParams(searchParams.toString())
    newURL.set('sort', sort.value)

    //-- Update the new url --
    router.push(pathname + '?' + newURL.toString())
  }

  //-- Add a get param into the url to know what filters is active --
  const addUrlParamFilter = (filter: Filter) => {
    //-- Get params by filter type --
    const params = searchParams.get(filter.type)?.split(',') ?? []
    params.push(filter.value)

    //-- Prepare the new url --
    const newURL = new URLSearchParams(searchParams.toString())
    newURL.set(filter.type, params.join(','))

    //-- Reset the current page number --
    newURL.delete('page')

    //-- Update the URL --
    router.push(pathname + '?' + newURL.toString())
  }

  //-- Remove a get param into the url to know what filters is active --
  const removeUrlParamFilter = (filter: Filter) => {
    //-- Get current params of the filter type --
    let params = searchParams.get(filter.type)?.split(',') ?? []

    //-- Remove the current filter --
    params = params.filter((param) => param !== filter.value && param !== '')

    //-- Prepare the new URL --
    const newURL = new URLSearchParams(searchParams.toString())
    params.length === 0 ? newURL.delete(filter.type) : newURL.set(filter.type, params.join(','))

    //-- Reset the current page number --
    newURL.delete('page')

    //-- Update the URL--
    router.push(pathname + '?' + newURL.toString())
  }

  //---------- EVENTS HANDLERS ----------//
  const handleToggleFilter = (e: React.ChangeEvent<HTMLInputElement>, filter: Filter) => (e.target.checked ? addUrlParamFilter(filter) : removeUrlParamFilter(filter))

  const handleSort = (sort: Sort) => addUrlParamSort(sort)

  //---------- RENDERED DATA ----------//
  const renderFilterItem = (filter: Filter) => (
    <label className={styles['item-filter']}>
      <input type="checkbox" onChange={(e) => handleToggleFilter(e, filter)} checked={activeFilters.some((f) => f.value === filter.value)} />
      <p className={styles.filter}>{filter.displayName}</p>
    </label>
  )

  const renderActiveFilterItem = (filter: Filter, index: number) => (
    <div key={index} className={styles['active-filter']}>
      <p>{filter.displayName}</p>

      <button onClick={() => removeUrlParamFilter(filter)}>
        <svg width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L13 13M13 1L1 13" stroke="#f4efe9" strokeWidth="1.33333" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  )

  const renderColorFilterItem = (filter: Filter) => (
    <label>
      <div className={styles['colorway-item']}>
        <input
          type="checkbox"
          onChange={(e) => handleToggleFilter(e, filter)}
          data-filter={JSON.stringify(filter)}
          checked={activeFilters.some((activeFilter) => activeFilter.value === filter.value)}
        />
        <div className={styles['colorway-indicator']} style={{ background: filter.value }}></div>
        <p className={styles.filter}>{filter.displayName}</p>
      </div>
    </label>
  )

  const renderSortItem = (sort: Sort, index: number) => (
    <button key={index} type="button" onClick={() => handleSort(sort)}>
      {sort.name}
    </button>
  )

  const brandsItemsFilter = filtersData.brands.map(renderFilterItem)
  const sizesItemsFilter = filtersData.sizes.map(renderFilterItem)
  const colorsItemsFilter = filtersData.colors.map(renderColorFilterItem)
  const sortsItems = sortData.map(renderSortItem)

  //----------  On Mount ----------//
  useEffect(() => {
    //-- Init filters data here else UUID cause hydratation problem --
    setFiltersData({
      brands: Object.values(Brand).map((brand) => ({ type: 'brands', value: brand, displayName: brand.replace('_', ' ').toLowerCase() })),
      sizes: sizesList.map((size) => ({ type: 'sizes', value: size, displayName: size })),
      colors: colorsFilter.map((colorFilter) => ({ type: 'colors', value: colorFilter.color, displayName: colorFilter.name })),
      priceRange: pricesRange.map((priceRange) => ({ type: 'priceRange', value: priceRange.toString(), displayName: priceRange.toString() })),
    })
  }, [])

  //-- Synchronisation between params filters and active filters state --
  useEffect(() => {
    //-- Filter params --
    const brandsParams = searchParams.get('brands')?.split(',') ?? []
    const sizesParams = searchParams.get('sizes')?.split(',') ?? []
    const colorsParams = searchParams.get('colors')?.split(',') ?? []

    //-- Active filters --
    const brandsActiveFilters: Filter[] = brandsParams.map((brand) => ({ type: 'brands', value: brand, displayName: brand.replace('_', ' ').toLowerCase() }))
    const sizesActiveFilters: Filter[] = sizesParams.map((size) => ({ type: 'sizes', value: size, displayName: size }))
    const colorsActiveFilters: Filter[] = colorsParams.map((color) => ({ type: 'colors', value: color, displayName: color }))

    //-- Active sort --
    const activeSort: Sort = searchParams.get('sort') === 'asc' ? { name: 'Prix croissant', value: 'asc' } : { name: 'Prix décroissant', value: 'desc' }

    //-- Update the active filters --
    setActiveFilters([...brandsActiveFilters, ...sizesActiveFilters, ...colorsActiveFilters])

    //-- Update the active sort --
    setActiveSort(activeSort)
  }, [searchParams])

  return (
    <div className={styles['filter-bar']}>
      <div className={styles['filters-container']}>
        {/* //---------- FILTERS ----------// */}
        <div className={styles['filters']}>
          <DropDownMenu title="Marque" data={brandsItemsFilter} isHovered />
          <DropDownMenu title="Taille" data={sizesItemsFilter} isHovered />
          <DropDownMenu title="Couleur" data={colorsItemsFilter} isHovered />
          <DropDownMenu
            title="Prix"
            data={filtersData.priceRange.length ? [<PriceRange range={[parseInt(filtersData.priceRange[0].value), parseInt(filtersData.priceRange[1].value)]} />] : []}
          />
        </div>

        {/* //---------- ACTIVE FILTERS ----------// */}
        {activeFilters.length !== 0 && (
          <div className={styles['active-filters']}>
            {activeFilters.map(renderActiveFilterItem)}

            <Button variant="link" onClick={removeAllUrlFilter}>
              Effacer tout
            </Button>
          </div>
        )}

        <p className={styles['article-number']}>{totalProducts + ' produits'}</p>
      </div>

      {/* //---------- SORTS ----------// */}
      <div className={styles['sort-container']}>
        <p className={styles['sort-label']}>Trier par :</p>
        <DropDownMenu title={activeSort?.name ?? sortData[0].name} data={sortsItems} isHovered />
      </div>
    </div>
  )
}
