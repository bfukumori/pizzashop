import dayjs from 'dayjs'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { DateRange } from 'react-day-picker'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'
import { violet } from 'tailwindcss/colors'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { DateRangePicker } from '@/components/ui/date-range-picker'
import { Label } from '@/components/ui/label'

import { useMetrics } from './hooks/useMetrics'

export function RevenueChart() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: dayjs().subtract(7, 'day').toDate(),
    to: dayjs().toDate(),
  })

  const { chartData } = useMetrics(
    date?.from?.toLocaleString('en', { dateStyle: 'short' }),
    date?.to?.toLocaleString('en', { dateStyle: 'short' }),
  )

  return (
    <Card className="lg:col-span-6">
      <CardHeader className="flex-row flex-wrap items-center justify-between pb-8">
        <div className="mb-4 space-y-1">
          <CardTitle className="text-base font-medium">
            Receita no período
          </CardTitle>
          <CardDescription>Receita diária no período</CardDescription>
        </div>
        <div className="flex w-full flex-wrap items-center justify-between gap-3">
          <Label>Período</Label>
          <DateRangePicker date={date} onDateChange={setDate} />
        </div>
      </CardHeader>
      <CardContent>
        {chartData ? (
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={chartData} style={{ fontSize: 12 }}>
              <XAxis dataKey="date" axisLine={false} tickLine={false} dy={16} />
              <YAxis
                stroke="#888"
                axisLine={false}
                tickLine={false}
                width={80}
                tickFormatter={(value: number) =>
                  value.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })
                }
              />
              <CartesianGrid vertical={false} className="stroke-muted" />
              <Line
                type="linear"
                strokeWidth={2}
                dataKey="receipt"
                stroke={violet[400]}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-[240px] w-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
