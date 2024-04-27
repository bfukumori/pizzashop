import { useQuery } from '@tanstack/react-query'

import { getOrderDetails } from '@/api/get-order-details'

interface UseOrderDetailsProps {
  orderId: string
  enabled: boolean
}

export function useOrderDetails({ orderId, enabled }: UseOrderDetailsProps) {
  const { data: order } = useQuery({
    queryKey: ['order', orderId],
    queryFn: () => getOrderDetails({ orderId }),
    enabled,
    staleTime: Infinity,
  })

  return { order }
}
