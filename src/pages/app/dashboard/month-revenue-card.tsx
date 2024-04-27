import { DollarSign } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { useMetrics } from './hooks/useMetrics'
import { MetricsCardSkeleton } from './metrics-card-skeleton'
import { MetricsData } from './metrics-data'

export function MonthRevenueCard() {
  const { monthRevenue } = useMetrics()

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Receita total (mês)
        </CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        {monthRevenue ? (
          <MetricsData
            isPrice
            timeReference="ao mês passado"
            value={monthRevenue.receipt / 100}
            percentage={monthRevenue.diffFromLastMonth}
            variant={
              monthRevenue.diffFromLastMonth >= 0 ? 'positive' : 'negative'
            }
          />
        ) : (
          <MetricsCardSkeleton />
        )}
      </CardContent>
    </Card>
  )
}
