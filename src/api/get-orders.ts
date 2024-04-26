import { api } from '@/lib/axios'
import { OrderFiltersSchema } from '@/pages/app/orders/order-table-filters'

export type OrderStatusType =
  | 'pending'
  | 'canceled'
  | 'processing'
  | 'delivering'
  | 'delivered'

export type Order = {
  orderId: string
  createdAt: Date
  status: OrderStatusType
  customerName: string
  total: number
}

export interface GetOrdersResponse {
  orders: Order[]
  meta: {
    pageIndex: number
    perPage: number
    totalCount: number
  }
}

export interface GetOrdersParams {
  pageIndex?: number | null
  customerName?: string | null
  status?: OrderFiltersSchema['status'] | null
  orderId?: string | null
}

export async function getOrders({
  pageIndex,
  customerName,
  status,
  orderId,
}: GetOrdersParams) {
  const response = await api.get<GetOrdersResponse>('/orders', {
    params: {
      pageIndex,
      customerName,
      status: status === 'all' ? undefined : status,
      orderId,
    },
  })

  return response.data
}
