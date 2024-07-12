import { http, HttpResponse, HttpResponseResolver } from 'msw'

import { GetDailyRevenueInPeriodResponse } from '@/api/get-daily-revenue-in-period'
import { GetDayOrdersAmountResponse } from '@/api/get-day-orders-amount'
import { GetMonthCanceledOrdersAmountResponse } from '@/api/get-month-canceled-orders-amount'
import { GetMonthOrdersAmountResponse } from '@/api/get-month-orders-amount'
import { GetMonthRevenueResponse } from '@/api/get-month-revenue'
import { GetPopularProductsResponse } from '@/api/get-popular-products'

const getDayOrdersAmountResolver: HttpResponseResolver<
  never,
  never,
  GetDayOrdersAmountResponse
> = async () => {
  return HttpResponse.json({
    amount: 20,
    diffFromYesterday: -5,
  })
}

const getMonthOrdersAmountResolver: HttpResponseResolver<
  never,
  never,
  GetMonthOrdersAmountResponse
> = async () => {
  return HttpResponse.json({
    amount: 200,
    diffFromLastMonth: 7,
  })
}

const getMonthCanceledOrdersAmountResolver: HttpResponseResolver<
  never,
  never,
  GetMonthCanceledOrdersAmountResponse
> = async () => {
  return HttpResponse.json({
    amount: 5,
    diffFromLastMonth: -5,
  })
}

const getMonthRevenueResolver: HttpResponseResolver<
  never,
  never,
  GetMonthRevenueResponse
> = async () => {
  return HttpResponse.json({
    receipt: 20000,
    diffFromLastMonth: 10,
  })
}

const getDailyRevenueInPeriodResolver: HttpResponseResolver<
  never,
  never,
  GetDailyRevenueInPeriodResponse
> = async () => {
  return HttpResponse.json([
    { date: '01/01/2024', receipt: 2000 },
    { date: '02/01/2024', receipt: 800 },
    { date: '03/01/2024', receipt: 8000 },
    { date: '04/01/2024', receipt: 540 },
    { date: '05/01/2024', receipt: 400 },
    { date: '06/01/2024', receipt: 700 },
    { date: '07/01/2024', receipt: 1000 },
  ])
}

const getPopularProductsResolver: HttpResponseResolver<
  never,
  never,
  GetPopularProductsResponse
> = async () => {
  return HttpResponse.json([
    { product: 'Pizza 01', amount: 2 },
    { product: 'Pizza 02', amount: 5 },
    { product: 'Pizza 03', amount: 3 },
    { product: 'Pizza 04', amount: 7 },
    { product: 'Pizza 05', amount: 1 },
  ])
}

const handlers = [
  http.get('/metrics/day-orders-amount', getDayOrdersAmountResolver),
  http.get('/metrics/month-orders-amount', getMonthOrdersAmountResolver),
  http.get(
    '/metrics/month-canceled-orders-amount',
    getMonthCanceledOrdersAmountResolver,
  ),
  http.get('/metrics/month-receipt', getMonthRevenueResolver),
  http.get('/metrics/daily-receipt-in-period', getDailyRevenueInPeriodResolver),
  http.get('/metrics/popular-products', getPopularProductsResolver),
]

export const dashboardHandlers = [...handlers]
