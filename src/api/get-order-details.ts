import { api } from '@/lib/axios'

import { OrderStatusType } from './get-orders'

type Customer = {
  name: string
  email: string
  phone: string | null
}

type OrderItem = {
  id: string
  priceInCents: number
  quantity: number
  product: {
    name: string
  }
}

export interface GetOrderDetailsParams {
  orderId: string
}

export interface GetOrderDetailsResponse {
  status: OrderStatusType
  id: string
  createdAt: Date
  totalInCents: number
  customer: Customer
  orderItems: OrderItem[]
}

export async function getOrderDetails({ orderId }: GetOrderDetailsParams) {
  const response = await api.get<GetOrderDetailsResponse>(`/orders/${orderId}`)

  return response.data
}
