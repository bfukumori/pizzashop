import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import { getDailyRevenueInPeriod } from '@/api/get-daily-revenue-in-period'
import { getDayOrdersAmount } from '@/api/get-day-orders-amount'
import { getMonthCanceledOrdersAmount } from '@/api/get-month-canceled-orders-amount'
import { getMonthOrdersAmount } from '@/api/get-month-orders-amount'
import { getMonthRevenue } from '@/api/get-month-revenue'
import { getPopularProducts } from '@/api/get-popular-products'

export function useMetrics(from?: string, to?: string) {
  const { data: dayOrdersAmount } = useQuery({
    queryKey: ['metrics', 'day-orders-amount'],
    queryFn: getDayOrdersAmount,
  })

  const { data: monthOrdersAmount } = useQuery({
    queryKey: ['metrics', 'month-orders-amount'],
    queryFn: getMonthOrdersAmount,
  })

  const { data: monthCanceledOrdersAmount } = useQuery({
    queryKey: ['metrics', 'month-canceled-orders-amount'],
    queryFn: getMonthCanceledOrdersAmount,
  })

  const { data: monthRevenue } = useQuery({
    queryKey: ['metrics', 'month-revenue'],
    queryFn: getMonthRevenue,
  })

  const { data: popularProducts } = useQuery({
    queryKey: ['metrics', 'popular-products'],
    queryFn: getPopularProducts,
  })

  const { data: dailyRevenueInperiod } = useQuery({
    queryKey: ['metrics', 'daily-revenue-in-period', from, to],
    queryFn: () => getDailyRevenueInPeriod({ from, to }),
  })

  const chartData = useMemo(() => {
    return dailyRevenueInperiod?.map((item) => ({
      date: item.date,
      receipt: item.receipt / 100,
    }))
  }, [dailyRevenueInperiod])

  return {
    dayOrdersAmount,
    monthRevenue,
    monthCanceledOrdersAmount,
    monthOrdersAmount,
    popularProducts,
    chartData,
  }
}
