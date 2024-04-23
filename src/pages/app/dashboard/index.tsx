import { Helmet } from 'react-helmet-async'

import { DailyOrdersAmountCard } from './daily-orders-amount-card'
import { MonthlyCencelledOrdersAmountCard } from './monthly-canceled-orders-amount-card'
import { MonthlyOrdersAmountCard } from './monthly-orders-amount-card'
import { MonthlyRevenueCard } from './monthly-revenue-card'
import { PopularProductsChart } from './popular-products-chart'
import { RevenueChart } from './revenue-chart'

export function Dashboard() {
  return (
    <>
      <Helmet title="Dashboard">
        <title>Dashboard</title>
      </Helmet>
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="grid grid-cols-4 gap-4">
          <MonthlyRevenueCard />
          <MonthlyOrdersAmountCard />
          <DailyOrdersAmountCard />
          <MonthlyCencelledOrdersAmountCard />
        </div>
        <div className="grid grid-cols-9 gap-4">
          <RevenueChart />
          <PopularProductsChart />
        </div>
      </div>
    </>
  )
}
