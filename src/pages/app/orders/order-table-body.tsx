import { Order } from '@/api/get-orders'
import { TableBody } from '@/components/ui/table'

import { OrderTableRow } from './order-table-row'

interface OrderTableBodyProps {
  orders: Order[]
}

export function OrderTableBody({ orders }: OrderTableBodyProps) {
  return (
    <TableBody>
      {orders.map((order) => (
        <OrderTableRow key={order.orderId} order={order} />
      ))}
    </TableBody>
  )
}
