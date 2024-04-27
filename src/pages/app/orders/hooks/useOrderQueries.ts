import { useQuery } from '@tanstack/react-query'

import { getOrders } from '@/api/get-orders'

import { useOrderFilter } from './useOrderFilter'
import { useOrderPagination } from './useOrderPagination'

export function useOrderQueries() {
  const { orderId, customerName, status } = useOrderFilter()
  const { pageIndex } = useOrderPagination()

  const { data: result, isLoading: isLoadingOrders } = useQuery({
    queryKey: ['orders', pageIndex, orderId, customerName, status],
    queryFn: () => getOrders({ pageIndex, orderId, customerName, status }),
    staleTime: Infinity,
  })

  return {
    orderResults: result,
    isLoadingOrders,
  }
}
