import { Utensils } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { useMetrics } from './hooks/useMetrics'
import { MetricsData } from './metrics-data'

export function MonthOrdersAmountCard() {
  const { monthOrdersAmount } = useMetrics()

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">Pedidos (mês)</CardTitle>
        <Utensils className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        {monthOrdersAmount && (
          <MetricsData
            timeReference="ao mês passado"
            value={monthOrdersAmount.amount}
            percentage={monthOrdersAmount.diffFromLastMonth}
            variant={
              monthOrdersAmount.diffFromLastMonth >= 0 ? 'positive' : 'negative'
            }
          />
        )}
      </CardContent>
    </Card>
  )
}
