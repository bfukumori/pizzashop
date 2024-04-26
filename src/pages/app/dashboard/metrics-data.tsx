import { priceFormatter } from '@/utils/priceFormatter'

interface MetricsDataProps {
  value: number
  percentage: number
  variant: 'positive' | 'negative'
  timeReference: string
  isPrice?: boolean
  isInverse?: boolean
}

export function MetricsData({
  value,
  variant,
  percentage,
  timeReference,
  isPrice,
  isInverse,
}: MetricsDataProps) {
  const percentageNegativeValue = isInverse
    ? `+${percentage}%`
    : `-${percentage}%`
  const percentagePositiveValue = isInverse
    ? `-${percentage}%`
    : `+${percentage}%`

  return (
    <>
      <span className="text-2xl font-bold tracking-tight">
        {isPrice ? priceFormatter(value) : value.toLocaleString('pt-BR')}
      </span>
      <p className="text-xs text-muted-foreground">
        {variant === 'negative' ? (
          <span className="text-rose-500 dark:text-rose-400">
            {percentageNegativeValue}
          </span>
        ) : (
          <span className="text-emerald-500 dark:text-emerald-400">
            {percentagePositiveValue}
          </span>
        )}{' '}
        em relação {timeReference}
      </p>
    </>
  )
}
