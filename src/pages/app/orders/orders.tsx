import { Helmet } from 'react-helmet-async'

import { Pagination } from '@/components/pagination'
import { Table, TableBody } from '@/components/ui/table'

import { OrderTableFilters } from './order-table-filters'
import { OrderTableHeader } from './order-table-header'
import { OrderTableRow } from './order-table-row'

export function Orders() {
  return (
    <>
      <Helmet title="Pedidos" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>
        <div className="space-y-2.5">
          <OrderTableFilters />
          <div className="rounded-md border">
            <Table>
              <OrderTableHeader />
              <TableBody>
                {Array.from({ length: 10 }).map((_, i) => (
                  <OrderTableRow key={i} />
                ))}
              </TableBody>
            </Table>
          </div>
          <Pagination pageIndex={0} totalCount={105} perPage={10} />
        </div>
      </div>
    </>
  )
}
