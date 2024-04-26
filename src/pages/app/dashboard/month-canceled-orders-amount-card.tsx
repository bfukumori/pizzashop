import { DollarSign } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { useMetrics } from './hooks/useMetrics'
import { MetricsData } from './metrics-data'

export function MonthCencelledOrdersAmountCard() {
  const { monthCanceledOrdersAmount } = useMetrics()

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Cancelamentos (mês)
        </CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        {monthCanceledOrdersAmount && (
          <MetricsData
            isInverse
            timeReference="ao mês passado"
            value={monthCanceledOrdersAmount.amount}
            percentage={monthCanceledOrdersAmount.diffFromLastMonth}
            variant={
              monthCanceledOrdersAmount.diffFromLastMonth < 0
                ? 'positive'
                : 'negative'
            }
          />
        )}
      </CardContent>
    </Card>
  )
}
