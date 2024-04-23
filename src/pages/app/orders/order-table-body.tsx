import { TableBody } from '@/components/ui/table'

import { OrderTableRow } from './order-table-row'

export function OrderTableBody() {
  return (
    <TableBody>
      {Array.from({ length: 10 }).map((_, i) => (
        <OrderTableRow key={i} />
      ))}
    </TableBody>
  )
}
