import { render } from '@testing-library/react'

import { OrderStatusType } from '@/api/get-orders'

import { OrderStatus, orderStatusMap } from './order-status'

let status: OrderStatusType

describe('Order Status', () => {
  it('should display the right text and badge when order status is pending', () => {
    status = 'pending'
    const text = orderStatusMap[status]
    const wrapper = render(<OrderStatus status={status} />)

    const statusText = wrapper.getByText(text)
    const badgeElement = wrapper.getByTestId('badge')

    expect(statusText).toBeInTheDocument()
    expect(badgeElement).toHaveClass('bg-slate-400')
  })

  it('should display the right text and badge when order status is canceled', () => {
    status = 'canceled'
    const text = orderStatusMap[status]
    const wrapper = render(<OrderStatus status={status} />)

    const statusText = wrapper.getByText(text)
    const badgeElement = wrapper.getByTestId('badge')

    expect(statusText).toBeInTheDocument()
    expect(badgeElement).toHaveClass('bg-rose-500')
  })

  it('should display the right text and badge when order status is delivering', () => {
    status = 'delivering'
    const text = orderStatusMap[status]
    const wrapper = render(<OrderStatus status={status} />)

    const statusText = wrapper.getByText(text)
    const badgeElement = wrapper.getByTestId('badge')

    expect(statusText).toBeInTheDocument()
    expect(badgeElement).toHaveClass('bg-amber-500')
  })

  it('should display the right text and badge when order status is processing', () => {
    status = 'processing'
    const text = orderStatusMap[status]
    const wrapper = render(<OrderStatus status={status} />)

    const statusText = wrapper.getByText(text)
    const badgeElement = wrapper.getByTestId('badge')

    expect(statusText).toBeInTheDocument()
    expect(badgeElement).toHaveClass('bg-amber-500')
  })

  it('should display the right text and badge when order status is delivered', () => {
    status = 'delivered'
    const text = orderStatusMap[status]
    const wrapper = render(<OrderStatus status={status} />)

    const statusText = wrapper.getByText(text)
    const badgeElement = wrapper.getByTestId('badge')

    expect(statusText).toBeInTheDocument()
    expect(badgeElement).toHaveClass('bg-emerald-500')
  })
})
