import { useQuery } from '@tanstack/react-query'

import { getOrders } from '@/api/get-orders'
import { TableBody } from '@/components/ui/table'

import { OrderTableRow } from './order-table-row'

export function OrderTableBody() {
  const { data: result } = useQuery({
    queryKey: ['orders'],
    queryFn: getOrders,
  })

  return (
    <TableBody>
      {result &&
        result.orders.map((order) => (
          <OrderTableRow key={order.orderId} order={order} />
        ))}
    </TableBody>
  )
}
