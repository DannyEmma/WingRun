'use client'

import styles from './FilterBar.module.css'
import PriceRange from '@/components/features/category/PriceRange/PriceRange'
import Button from '@/components/ui/Button/Button'
import DropDownMenu from '@/components/ui/DropDownMenu/DropDownMenu'
import { Filter, Sort } from '@/lib/types'
import { Audience, ColorFilter } from '@prisma/client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

type FiltersData = {
  brands: Filter[]
  sizes: Filter[]
  colors: Filter[]
  priceRange: Filter[]
  adults: Filter[]
  kids: Filter[]
}

interface FilterBarProps {
  colorsFilter: ColorFilter[]
  pricesRange: number[]
  sizesList: string[]
  brandList: string[]
}

const sortData: Sort[] = [
  { value: 'asc', name: 'Prix croissant' },
  { value: 'desc', name: 'Prix décroissant' },
]

export default function FilterBar({ colorsFilter, pricesRange, sizesList, brandList }: FilterBarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  //---------- STATE ----------//
  const [filtersData, setFiltersData] = useState<FiltersData>({ brands: [], sizes: [], colors: [], priceRange: [], adults: [], kids: [] })
  const [activeFilters, setActiveFilters] = useState<Filter[]>([])
  const [activeSort, setActiveSort] = useState<Sort | null>(null)

  //---------- METHODS ----------//
  const removeAllUrlFilter = () => {
    const newURL = new URLSearchParams(searchParams.toString())
    newURL.delete('brands')
    newURL.delete('sizes')
    newURL.delete('colors')
    newURL.delete('priceRange')
    newURL.delete('adults')
    newURL.delete('kids')

    //-- Update the new url --
    router.push(pathname + '?' + newURL.toString())
  }

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

  //-- Use to don't have anything in filters param --
  const cleanUrlParams = () => {
    //-- Prepare the new url --
    const newURL = new URLSearchParams(searchParams.toString())

    //-- Cleaning of params --
    const cleanBrands = newURL
      .get('brands')
      ?.split(',')
      .filter((value) => value !== '' && brandList.includes(value))

    const cleanSizes = newURL
      .get('sizes')
      ?.split(',')
      .filter((value) => value !== '' && sizesList.includes(value))

    const cleanColors = newURL
      .get('colors')
      ?.split(',')
      .filter((value) => value !== '' && colorsFilter.some((filter) => filter.color === value))

    const cleanPriceRange = newURL
      .get('priceRange')
      ?.split(',')
      .filter((value, index) => {
        if (value !== '' && pricesRange[index]) {
          return (index === 0 && parseInt(value) >= pricesRange[index]) || (index === 1 && parseInt(value) <= pricesRange[index])
        }
      })

    const cleanAdults = newURL
      .get('adults')
      ?.split(',')
      .filter((value) => value !== '' && [Audience.MEN.toString(), Audience.WOMEN.toString()].includes(value))

    const cleanKids = newURL
      .get('kids')
      ?.split(',')
      .filter((value) => value !== '' && [Audience.BOY.toString(), Audience.GIRL.toString()].includes(value))

    //-- Add clean params --
    cleanBrands?.length ? newURL.set('brands', cleanBrands?.join(',')) : newURL.delete('brands')
    cleanSizes?.length ? newURL.set('sizes', cleanSizes?.join(',')) : newURL.delete('sizes')
    cleanColors?.length ? newURL.set('colors', cleanColors?.join(',')) : newURL.delete('colors')
    cleanPriceRange?.length ? newURL.set('priceRange', cleanPriceRange?.join(',')) : newURL.delete('priceRange')
    cleanAdults?.length ? newURL.set('adults', cleanAdults?.join(',')) : newURL.delete('adults')
    cleanKids?.length ? newURL.set('kids', cleanKids?.join(',')) : newURL.delete('kids')

    //-- We don't want adults and kids same time --
    if (newURL.has('adults') && newURL.has('kids')) {
      newURL.delete('adults')
      newURL.delete('kids')
    }

    //-- Update the URL --
    router.push(pathname + '?' + newURL.toString())

    return { brandsParams: cleanBrands ?? [], sizesParams: cleanSizes ?? [], colorsParams: cleanColors ?? [], adultsParams: cleanAdults ?? [], kidsParams: cleanKids ?? [] }
  }

  //---------- EVENTS HANDLERS ----------//
  const handleToggleFilter = (e: React.ChangeEvent<HTMLInputElement>, filter: Filter) => (e.target.checked ? addUrlParamFilter(filter) : removeUrlParamFilter(filter))

  const handleSort = (sort: Sort) => addUrlParamSort(sort)

  //---------- RENDERED DATA ----------//
  const renderFilterItem = (filter: Filter) => (
    <label className={styles['item-filter']}>
      <input
        className={`${styles['checkbox-item-filter']} ${styles['dark-checkmark']}`}
        type="checkbox"
        onChange={(e) => handleToggleFilter(e, filter)}
        checked={activeFilters.some((f) => f.value === filter.value)}
      />
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
          className={`${styles['checkbox-item-filter']} ${['blanc', 'jaune', 'orange', 'rose', 'beige'].includes(filter.displayName) ? styles['dark-checkmark'] : styles['light-checkmark']}`}
          type="checkbox"
          onChange={(e) => handleToggleFilter(e, filter)}
          data-filter={JSON.stringify(filter)}
          checked={activeFilters.some((activeFilter) => activeFilter.value === filter.value)}
          style={{ background: filter.value }}
        />
        <p className={styles.filter}>{filter.displayName}</p>
      </div>
    </label>
  )

  const renderSortItem = (sort: Sort, index: number) => (
    <button key={index} type="button" onClick={() => handleSort(sort)}>
      {sort.name}
    </button>
  )

  //----------  On Mount ----------//
  useEffect(() => {
    //-- Init filters data here else UUID cause hydratation problem --
    setFiltersData({
      brands: brandList.map((brand) => ({ type: 'brands', value: brand, displayName: brand.replace('_', ' ').toLowerCase() })),
      sizes: sizesList.map((size) => ({ type: 'sizes', value: size, displayName: size })),
      colors: colorsFilter.map((colorFilter) => ({ type: 'colors', value: colorFilter.color, displayName: colorFilter.name })),
      priceRange: pricesRange.map((priceRange) => ({ type: 'priceRange', value: priceRange.toString(), displayName: priceRange.toString() })),
      adults: [Audience.MEN, Audience.WOMEN].map((audience) => ({ type: 'adults', value: audience, displayName: audience === Audience.MEN ? 'Homme' : 'Femme' })),
      kids: [Audience.BOY, Audience.GIRL].map((audience) => ({ type: 'kids', value: audience, displayName: audience === Audience.BOY ? 'Garçon' : 'Fille' })),
    })
  }, [])

  //-- Synchronisation between params filters and active filters state --
  useEffect(() => {
    const { brandsParams, sizesParams, colorsParams, adultsParams, kidsParams } = cleanUrlParams()

    //-- Active filters --
    const brandsActiveFilters: Filter[] = brandsParams.map((brand) => ({ type: 'brands', value: brand, displayName: brand.replace('_', ' ').toLowerCase() }))
    const sizesActiveFilters: Filter[] = sizesParams.map((size) => ({ type: 'sizes', value: size, displayName: size }))
    const colorsActiveFilters: Filter[] = colorsParams.map((color) => ({ type: 'colors', value: color, displayName: color }))
    const adultsActiveFilters: Filter[] = adultsParams.map((adults) => ({ type: 'adults', value: adults, displayName: adults }))
    const kidsActiveFilters: Filter[] = kidsParams.map((kids) => ({ type: 'kids', value: kids, displayName: kids }))

    //-- Active sort --
    const activeSort: Sort = searchParams.get('sort') === 'asc' ? { name: 'Prix croissant', value: 'asc' } : { name: 'Prix décroissant', value: 'desc' }

    //-- Update the active filters --
    setActiveFilters([...brandsActiveFilters, ...sizesActiveFilters, ...colorsActiveFilters, ...adultsActiveFilters, ...kidsActiveFilters])

    //-- Update the active sort --
    setActiveSort(activeSort)
  }, [searchParams])

  return (
    <div className={styles['filter-bar']}>
      <div className={styles['filters-container']}>
        {/* //---------- FILTERS ----------// */}
        <div className={styles['filters']}>
          <DropDownMenu title="Marque" data={filtersData.brands.map(renderFilterItem)} isHovered />
          <DropDownMenu title="Taille" data={filtersData.sizes.map(renderFilterItem)} isHovered />
          <DropDownMenu title="Couleur" data={filtersData.colors.map(renderColorFilterItem)} isHovered />
          <DropDownMenu
            title="Prix"
            data={filtersData.priceRange.length ? [<PriceRange range={[parseInt(filtersData.priceRange[0].value), parseInt(filtersData.priceRange[1].value)]} />] : []}
          />
          {!activeFilters.some((filter) => filter.type === 'kids') && <DropDownMenu title="Adultes" data={filtersData.adults.map(renderFilterItem)} />}
          {!activeFilters.some((filter) => filter.type === 'adults') && <DropDownMenu title="Enfants" data={filtersData.kids.map(renderFilterItem)} />}
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
      </div>

      {/* //---------- SORTS ----------// */}
      <div className={styles['sort-container']}>
        <p className={styles['sort-label']}>Trier par :</p>
        <DropDownMenu title={activeSort?.name ?? sortData[0].name} data={sortData.map(renderSortItem)} isHovered />
      </div>
    </div>
  )
}
