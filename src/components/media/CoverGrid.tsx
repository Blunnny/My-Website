'use client'

import { CoverCard, type CoverCardItem } from './CoverCard'
import { cn } from '@/lib/utils'

type CoverGridProps = {
  items: CoverCardItem[]
  aspect?: 'poster' | 'square'
  className?: string
}

export function CoverGrid({
  items,
  aspect = 'poster',
  className,
}: CoverGridProps) {
  return (
    <ul
      className={cn(
        'grid grid-cols-2 items-start gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5',
        className,
      )}
    >
      {items.map((item) => (
        <CoverCard key={item.id} item={item} aspect={aspect} />
      ))}
    </ul>
  )
}
