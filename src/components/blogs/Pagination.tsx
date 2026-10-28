import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const itemClass =
  'inline-flex h-9 min-w-9 items-center justify-center rounded-full px-3 text-sm tabular-nums transition-colors duration-200'

export function Pagination({
  current,
  total,
  hrefFor,
  onNavigate,
  scroll,
}: {
  current: number
  total: number
  hrefFor: (page: number) => string
  onNavigate?: () => void
  scroll?: boolean
}) {
  if (total <= 1) return null

  const pages = Array.from({ length: total }, (_, i) => i + 1)

  function step(page: number, label: string, icon: React.ReactNode) {
    const disabled = page < 1 || page > total
    if (disabled) {
      return (
        <span
          aria-hidden
          className={cn(itemClass, 'px-2.5 text-muted-foreground/40')}
        >
          {icon}
        </span>
      )
    }
    return (
      <Link
        href={hrefFor(page)}
        scroll={scroll}
        onClick={onNavigate}
        aria-label={label}
        className={cn(
          itemClass,
          'px-2.5 text-muted-foreground hover:bg-muted hover:text-foreground',
        )}
      >
        {icon}
      </Link>
    )
  }

  return (
    <nav
      aria-label="分页"
      className="mt-10 flex flex-wrap items-center justify-center gap-1"
    >
      {step(current - 1, '上一页', <ChevronLeft className="h-4 w-4" />)}
      {pages.map((page) => (
        <Link
          key={page}
          href={hrefFor(page)}
          scroll={scroll}
          onClick={onNavigate}
          aria-current={page === current ? 'page' : undefined}
          className={cn(
            itemClass,
            page === current
              ? 'bg-primary font-medium text-primary-foreground'
              : 'text-muted-foreground hover:bg-muted hover:text-foreground',
          )}
        >
          {page}
        </Link>
      ))}
      {step(current + 1, '下一页', <ChevronRight className="h-4 w-4" />)}
    </nav>
  )
}
