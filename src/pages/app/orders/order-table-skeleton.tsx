import { Search } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { TableCell, TableRow } from '@/components/ui/table'

export function OrderTableSkeleton() {
  return Array.from({ length: 10 }).map((_, i) => (
    <TableRow key={i}>
      <TableCell>
        <Button disabled variant="outline" size="xs">
          <Search className="h-3 w-3" />
        </Button>
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 max-w-[172px]" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 max-w-[148px]" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 max-w-[110px]" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 max-w-[200px]" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 max-w-[64px]" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 max-w-[92px]" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 max-w-[92px]" />
      </TableCell>
    </TableRow>
  ))
}
