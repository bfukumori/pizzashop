import { http, HttpResponse, HttpResponseResolver } from 'msw'

import {
  GetOrderDetailsParams,
  GetOrderDetailsResponse,
} from '@/api/get-order-details'
import { GetOrdersResponse, OrderStatusType } from '@/api/get-orders'

const status: OrderStatusType[] = [
  'pending',
  'canceled',
  'processing',
  'delivering',
  'delivered',
]

const orders: GetOrdersResponse['orders'] = Array.from(
  { length: 60 },
  (_, i) => ({
    orderId: `order-id-${i + 1}`,
    customerName: `Customer ${i + 1}`,
    status: status[Math.floor(Math.random() * status.length)],
    total: Math.floor(Math.random() * 10000),
    createdAt: new Date(),
  }),
)

const getOrdersResolver: HttpResponseResolver<
  never,
  never,
  GetOrdersResponse
> = async ({ request }) => {
  const { searchParams } = new URL(request.url)

  const orderId = searchParams.get('orderId')
  const status = searchParams.get('status') as OrderStatusType
  const customerName = searchParams.get('customerName')
  const pageIndex = searchParams.get('pageIndex')
    ? Number(searchParams.get('pageIndex'))
    : 0

  let filteredOrders = orders

  if (customerName) {
    filteredOrders = filteredOrders.filter((order) =>
      order.customerName.toLowerCase().includes(customerName.toLowerCase()),
    )
  }

  if (orderId) {
    filteredOrders = filteredOrders.filter((order) =>
      order.orderId.includes(orderId),
    )
  }

  if (status) {
    filteredOrders = filteredOrders.filter((order) => (order.status = status))
  }

  const paginatedOrders = filteredOrders.slice(
    pageIndex * 10,
    (pageIndex + 1) * 10,
  )

  return HttpResponse.json({
    meta: {
      pageIndex,
      perPage: 10,
      totalCount: filteredOrders.length,
    },
    orders: paginatedOrders,
  })
}

const getOrderDetailsResolver: HttpResponseResolver<
  GetOrderDetailsParams,
  never,
  GetOrderDetailsResponse | { message: string }
> = async ({ params }) => {
  const order = orders.find((order) => order.orderId === params.orderId)

  if (!order) {
    return HttpResponse.json({ message: 'Order not found' }, { status: 400 })
  }

  const price1 = order.total - Math.floor(Math.random() * order.total)
  const price2 = order.total - price1

  return HttpResponse.json({
    id: params.orderId,
    customer: {
      name: order.customerName,
      email:
        order.customerName.toLowerCase().replace(' ', '_') + '@example.com',
      phone: '11999999999',
    },
    status: order.status,
    createdAt: order.createdAt,
    orderItems: [
      {
        id: 'order-item-1',
        priceInCents: price1,
        product: {
          name: 'Pizza Pepperoni',
        },
        quantity: 1,
      },
      {
        id: 'order-item-2',
        priceInCents: price2,
        product: {
          name: 'Pizza Corn Bacon',
        },
        quantity: 1,
      },
    ],
    totalInCents: order.total,
  })
}

const handlers = [
  http.get('/orders', getOrdersResolver),
  http.get('/orders/:orderId', getOrderDetailsResolver),
]

export const orderHandlers = [...handlers]
