import { Helmet } from 'react-helmet-async'

import { Pagination } from '@/components/pagination'
import { Table } from '@/components/ui/table'

import { useOrderPagination } from './hooks/useOrderPagination'
import { useOrderQueries } from './hooks/useOrderQueries'
import { OrderTableBody } from './order-table-body'
import { OrderTableFilters } from './order-table-filters'
import { OrderTableHeader } from './order-table-header'

export function Orders() {
  const { orderResults } = useOrderQueries()
  const { handlePageChange } = useOrderPagination()

  return (
    <>
      <Helmet title="Pedidos" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>
        {orderResults && (
          <div className="space-y-2.5">
            <OrderTableFilters />
            <div className="rounded-md border">
              <Table>
                <OrderTableHeader />
                <OrderTableBody orders={orderResults.orders} />
              </Table>
            </div>
            <Pagination
              pageIndex={orderResults.meta.pageIndex}
              totalCount={orderResults.meta.totalCount}
              perPage={orderResults.meta.perPage}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </>
  )
}
