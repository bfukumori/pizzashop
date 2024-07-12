import { http, HttpResponse, HttpResponseResolver } from 'msw'

import { ApproveOrderParams } from '@/api/approve-order'
import { CancelOrderParams } from '@/api/cancel-order'
import { DeliverOrderParams } from '@/api/deliver-order'
import { DispatchOrderParams } from '@/api/dispatch-order'

const approveOrderResolver: HttpResponseResolver<
  ApproveOrderParams,
  never
> = async ({ params }) => {
  if (params.orderId === 'error-order-id') {
    return HttpResponse.json(undefined, {
      status: 400,
    })
  }

  return HttpResponse.json(undefined, { status: 204 })
}

const canceledOrderResolver: HttpResponseResolver<
  CancelOrderParams,
  never
> = async ({ params }) => {
  if (params.orderId === 'error-order-id') {
    return HttpResponse.json(undefined, {
      status: 400,
    })
  }

  return HttpResponse.json(undefined, { status: 204 })
}

const deliveredOrderResolver: HttpResponseResolver<
  DeliverOrderParams,
  never
> = async ({ params }) => {
  if (params.orderId === 'error-order-id') {
    return HttpResponse.json(undefined, {
      status: 400,
    })
  }

  return HttpResponse.json(undefined, { status: 204 })
}

const dispatchOrderResolver: HttpResponseResolver<
  DispatchOrderParams,
  never
> = async ({ params }) => {
  if (params.orderId === 'error-order-id') {
    return HttpResponse.json(undefined, {
      status: 400,
    })
  }

  return HttpResponse.json(undefined, { status: 204 })
}

const handlers = [
  http.patch('/orders/:orderId/approve', approveOrderResolver),
  http.patch('/orders/:orderId/cancel', canceledOrderResolver),
  http.patch('/orders/:orderId/deliver', deliveredOrderResolver),
  http.patch('/orders/:orderId/dispatch', dispatchOrderResolver),
]

export const orderActionsHandlers = [...handlers]
