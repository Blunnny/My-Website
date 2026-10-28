'use client'

import { useRef, type HTMLAttributes, type MouseEvent } from 'react'
import { cn } from '@/lib/utils'

export function SpotlightCard({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement>(null)

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--spot-x', `${event.clientX - rect.left}px`)
    el.style.setProperty('--spot-y', `${event.clientY - rect.top}px`)
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={cn(
        'group/spot relative overflow-hidden rounded-2xl border border-border/70 bg-card/50',
        'transition-[border-color,box-shadow,transform] duration-300 ease-out',
        'hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5',
        'motion-safe:hover:-translate-y-0.5',
        className,
      )}
      {...props}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100 motion-reduce:hidden"
        style={{
          background:
            'radial-gradient(360px circle at var(--spot-x, 50%) var(--spot-y, 50%), hsl(var(--primary) / 0.12), transparent 65%)',
        }}
      />
      {children}
    </div>
  )
}
