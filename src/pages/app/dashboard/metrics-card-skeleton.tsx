import { Skeleton } from '@/components/ui/skeleton'

export function MetricsCardSkeleton() {
  return (
    <>
      <Skeleton className="mt-1 h-7 max-w-36" />
      <Skeleton className="h-4 max-w-52" />
    </>
  )
}
