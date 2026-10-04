'use client'

import { cn } from '@/lib/utils'
import type { ButtonHTMLAttributes } from 'react'

type FilterPillProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean
}

export function FilterPill({
  active = false,
  className,
  children,
  ...props
}: FilterPillProps) {
  return (
    <button
      type="button"
      className={cn(
        'rounded-full border px-3.5 py-1 text-sm transition-colors duration-200',
        'motion-safe:active:scale-[0.98]',
        active
          ? 'border-primary bg-primary text-primary-foreground'
          : 'border-border bg-background text-foreground hover:border-primary/40 hover:bg-muted/60',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
