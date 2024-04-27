import { Utensils } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { useMetrics } from './hooks/useMetrics'
import { MetricsCardSkeleton } from './metrics-card-skeleton'
import { MetricsData } from './metrics-data'

export function DayOrdersAmountCard() {
  const { dayOrdersAmount } = useMetrics()

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">Pedidos (dia)</CardTitle>
        <Utensils className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        {dayOrdersAmount ? (
          <MetricsData
            timeReference="a ontem"
            value={dayOrdersAmount.amount}
            percentage={dayOrdersAmount.diffFromYesterday}
            variant={
              dayOrdersAmount.diffFromYesterday >= 0 ? 'positive' : 'negative'
            }
          />
        ) : (
          <MetricsCardSkeleton />
        )}
      </CardContent>
    </Card>
  )
}
