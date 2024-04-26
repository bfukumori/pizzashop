import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { approveOrder } from '@/api/approve-order'
import { cancelOrder } from '@/api/cancel-order'
import { deliverOrder } from '@/api/deliver-order'
import { dispatchOrder } from '@/api/dispatch-order'
import { GetOrdersResponse, OrderStatusType } from '@/api/get-orders'
import { queryClient } from '@/lib/react-query'

function updateOrderStatusCache(orderId: string, status: OrderStatusType) {
  const ordersListCache = queryClient.getQueriesData<GetOrdersResponse>({
    queryKey: ['orders'],
  })

  ordersListCache.forEach(([cacheKey, cacheData]) => {
    if (!cacheData) {
      return
    }

    queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
      ...cacheData,
      orders: cacheData.orders.map((order) => {
        if (order.orderId === orderId) {
          return {
            ...order,
            status,
          }
        }

        return order
      }),
    })
  })
}

export function useOrderMutations() {
  const { mutateAsync: cancelOrderFn, isPending: isCancellingOrder } =
    useMutation({
      mutationFn: cancelOrder,
      onSuccess: (_, { orderId }) => {
        updateOrderStatusCache(orderId, 'canceled')
        toast.success('Pedido cancelado com sucesso')
      },
      onError: (error) => {
        console.error(error)
        toast.error('Erro ao cancelar o pedido')
      },
    })

  const { mutateAsync: approveOrderFn, isPending: isProcessingOrder } =
    useMutation({
      mutationFn: approveOrder,
      onSuccess: (_, { orderId }) => {
        updateOrderStatusCache(orderId, 'processing')
        toast.success('Status do pedido alterado com sucesso')
      },
      onError: (error) => {
        console.error(error)
        toast.error('Ocorreu um erro ao alterar o status do pedido')
      },
    })

  const { mutateAsync: dispatchOrderFn, isPending: isDispatchingOrder } =
    useMutation({
      mutationFn: dispatchOrder,
      onSuccess: (_, { orderId }) => {
        updateOrderStatusCache(orderId, 'delivering')
        toast.success('Status do pedido alterado com sucesso')
      },
      onError: (error) => {
        console.error(error)
        toast.error('Ocorreu um erro ao alterar o status do pedido')
      },
    })

  const { mutateAsync: deliverOrderFn, isPending: isDeliveredOrder } =
    useMutation({
      mutationFn: deliverOrder,
      onSuccess: (_, { orderId }) => {
        updateOrderStatusCache(orderId, 'delivered')
        toast.success('Status do pedido alterado com sucesso')
      },
      onError: (error) => {
        console.error(error)
        toast.error('Ocorreu um erro ao alterar o status do pedido')
      },
    })

  async function handleChangeOrderStatus({
    status,
    orderId,
  }: {
    status: OrderStatusType
    orderId: string
  }) {
    if (status === 'canceled') {
      cancelOrderFn({ orderId })
    } else if (status === 'pending') {
      approveOrderFn({ orderId })
    } else if (status === 'processing') {
      dispatchOrderFn({ orderId })
    } else if (status === 'delivering') {
      deliverOrderFn({ orderId })
    }
  }

  const isDisabled = {
    canceled: isCancellingOrder,
    processing: isDispatchingOrder,
    delivering: isDeliveredOrder,
    pending: isProcessingOrder,
  }

  const actionButtonText = {
    processing: 'Em entrega',
    delivering: 'Entregue',
    pending: 'Aprovar',
  }

  return {
    handleChangeOrderStatus,
    isDisabled,
    actionButtonText,
  }
}
