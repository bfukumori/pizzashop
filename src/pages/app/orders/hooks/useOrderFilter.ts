import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

const orderFiltersSchema = z.object({
  orderId: z.string().optional(),
  customerName: z.string().optional(),
  status: z
    .enum([
      'all',
      'pending',
      'canceled',
      'processing',
      'delivering',
      'delivered',
    ])
    .optional(),
})

export type OrderFiltersSchema = z.infer<typeof orderFiltersSchema>

export function useOrderFilter() {
  const [searchParams, setSearchParams] = useSearchParams()

  const orderId = searchParams.get('orderId')
  const customerName = searchParams.get('customerName')
  const status = searchParams.get('status') as OrderFiltersSchema['status']

  const { register, control, handleSubmit, reset } =
    useForm<OrderFiltersSchema>({
      defaultValues: {
        orderId: orderId ?? '',
        customerName: customerName ?? '',
        status: status ?? 'all',
      },
      resolver: zodResolver(orderFiltersSchema),
    })

  function handleFilter({ customerName, orderId, status }: OrderFiltersSchema) {
    setSearchParams((state) => {
      if (orderId) {
        state.set('orderId', orderId)
      } else {
        state.delete('orderId')
      }

      if (customerName) {
        state.set('customerName', customerName)
      } else {
        state.delete('customerName')
      }

      if (status) {
        state.set('status', status)
      } else {
        state.delete('status')
      }

      state.set('page', '1')

      return state
    })
  }

  function handleClearFilters() {
    setSearchParams((state) => {
      state.delete('orderId')
      state.delete('customerName')
      state.delete('status')
      state.set('page', '1')

      reset({
        orderId: '',
        customerName: '',
        status: 'all',
      })

      return state
    })
  }

  return {
    handleClearFilters,
    handleFilter,
    register,
    control,
    handleSubmit,
    orderId,
    customerName,
    status,
  }
}
