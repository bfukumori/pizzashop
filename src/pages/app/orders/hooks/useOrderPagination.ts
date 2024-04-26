import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

export function useOrderPagination() {
  const [searchParams, setSearchParams] = useSearchParams()

  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get('page') ?? '1')

  function handlePageChange(pageIndex: number) {
    setSearchParams((state) => {
      state.set('page', String(pageIndex + 1))

      return state
    })
  }

  return {
    pageIndex,
    handlePageChange,
  }
}
