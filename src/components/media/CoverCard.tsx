'use client'

import Image from 'next/image'
import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

export type CoverCardItem = {
  id: string
  cover: string
  title: string
  rank?: number
  rating?: number
  meta?: string
  comment?: string
}

type CoverCardProps = {
  item: CoverCardItem
  aspect?: 'poster' | 'square'
}

export function CoverCard({ item, aspect = 'poster' }: CoverCardProps) {
  return (
    <li className="col-span-1 row-span-4 grid grid-rows-subgrid gap-y-1.5">
      <div
        className={cn(
          'relative self-start overflow-hidden rounded-lg bg-muted shadow-sm ring-1 ring-border/60 transition-[transform,box-shadow] duration-300',
          'motion-safe:hover:scale-[1.02] motion-safe:hover:shadow-md',
          aspect === 'square' ? 'aspect-square' : 'aspect-[2/3]',
        )}
      >
        <Image
          src={item.cover}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 180px"
          className="object-cover"
        />
        {typeof item.rank === 'number' && (
          <span className="absolute left-2 top-2 rounded bg-background/85 px-1.5 py-0.5 text-[11px] font-medium tabular-nums text-foreground backdrop-blur-sm">
            #{item.rank}
          </span>
        )}
        {typeof item.rating === 'number' && (
          <span className="absolute bottom-2 right-2 inline-flex items-center gap-0.5 rounded bg-background/85 px-1.5 py-0.5 text-[11px] font-medium tabular-nums text-foreground backdrop-blur-sm">
            <Star className="h-3 w-3 fill-primary text-primary" />
            {item.rating.toFixed(1)}
          </span>
        )}
      </div>

      <p className="self-start text-sm font-semibold leading-snug tracking-tight text-foreground">
        {item.title}
      </p>

      <p className="self-start break-words text-xs leading-relaxed text-muted-foreground">
        {item.meta || '\u00A0'}
      </p>

      <p className="self-start rounded-md bg-muted/50 px-2.5 py-2 text-xs leading-relaxed text-muted-foreground">
        {item.comment || '暂无短评'}
      </p>
    </li>
  )
}
