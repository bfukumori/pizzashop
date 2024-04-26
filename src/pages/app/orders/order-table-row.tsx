import { ArrowRight, Search, X } from 'lucide-react'
import { useState } from 'react'

import { Order } from '@/api/get-orders'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'
import { dateFormatter } from '@/utils/dateFormatter'
import { priceFormatter } from '@/utils/priceFormatter'

import { useOrderMutations } from './hooks/useOrderMutations'
import { OrderDetails } from './order-details'
import { OrderStatus } from './order-status'

interface OrderTableRowProps {
  order: Order
}

export function OrderTableRow({ order }: OrderTableRowProps) {
  const [isOpen, setIsOpen] = useState(false)

  const { handleChangeOrderStatus, isDisabled, actionButtonText } =
    useOrderMutations()

  const { createdAt, customerName, orderId, status, total } = order

  return (
    <TableRow>
      <TableCell>
        <Dialog onOpenChange={setIsOpen} open={isOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Search className="h-3 w-3" />
              <span className="sr-only">Detalhes do pedido</span>
            </Button>
          </DialogTrigger>
          <OrderDetails orderId={orderId} open={isOpen} />
        </Dialog>
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">{orderId}</TableCell>
      <TableCell className="text-muted-foreground">
        {dateFormatter(createdAt)}
      </TableCell>
      <TableCell>
        <OrderStatus status={status} />
      </TableCell>
      <TableCell className="font-medium">{customerName}</TableCell>
      <TableCell className="font-medium">
        {priceFormatter(total / 100)}
      </TableCell>
      <TableCell>
        {!['canceled', 'delivered'].includes(status) && (
          <Button
            variant="outline"
            size="xs"
            onClick={() => handleChangeOrderStatus({ status, orderId })}
            disabled={isDisabled[status as keyof typeof isDisabled]}
          >
            <ArrowRight className="mr-2 h-3 w-3" />
            {actionButtonText[status as keyof typeof actionButtonText]}
          </Button>
        )}
      </TableCell>
      <TableCell>
        {!['canceled', 'delivered'].includes(status) && (
          <Button
            onClick={() =>
              handleChangeOrderStatus({ status: 'canceled', orderId })
            }
            variant="ghost"
            size="xs"
            disabled={isDisabled.canceled}
          >
            <X className="mr-2 h-3 w-3" />
            Cancelar
          </Button>
        )}
      </TableCell>
    </TableRow>
  )
}
