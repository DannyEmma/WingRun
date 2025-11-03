'use client'

import styles from './PaginationRounded.module.css'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function PaginationRounded({ pages }: { pages: number }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [page, setPage] = useState(1)

  const goToPage = (page: number) => {
    //-- Prepare new URL --
    const newURL = new URLSearchParams(searchParams)
    newURL.set('page', page.toString())

    //-- Update the new url --
    router.push(pathname + '?' + newURL)

    //-- Update the state --
    setPage(page)
  }

  //---------- USE EFFECT ----------//
  useEffect(() => {
    const pageParam = parseInt(searchParams.get('page') ?? '1')

    //-- Need to synchronise the current state with the current get param --
    if (pageParam !== page) goToPage(pageParam)
  }, [searchParams])

  //---------- EVENTS HANDLERS ----------//
  const handleChange = (e: React.ChangeEvent<unknown>, value: number) => goToPage(value)

  return (
    <div className={styles['pagination-container']}>
      <Stack spacing={2}>
        <Pagination count={pages} page={page} onChange={handleChange} variant="outlined" shape="rounded" />
      </Stack>
    </div>
  )
}
