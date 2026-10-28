'use client'

import { useEffect, useId, useState } from 'react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { QuarterlyRow, RankItem, RatingPoint } from '@/config/aboutStats'
import { cn } from '@/lib/utils'

export const chartColor = (index: number) =>
  `hsl(var(--chart-${(index % 5) + 1}))`

const axisTick = { fill: 'hsl(var(--muted-foreground))', fontSize: 12 }
const gridStroke = 'hsl(var(--border))'

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(query.matches)
    const onChange = () => setReduced(query.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])
  return reduced
}

type TooltipEntry = {
  name?: string | number
  value?: number | string
  color?: string
}

function ChartTooltip({
  active,
  payload,
  label,
  unit,
  digits = 0,
}: {
  active?: boolean
  payload?: ReadonlyArray<TooltipEntry>
  label?: string | number
  unit?: string
  digits?: number
}) {
  if (!active || !payload || payload.length === 0) return null
  return (
    <div className="rounded-lg border border-border bg-popover/95 px-3 py-2 text-xs shadow-lg backdrop-blur-sm">
      {label !== undefined && (
        <p className="mb-1 font-medium text-foreground">{label}</p>
      )}
      <ul className="space-y-0.5">
        {payload.map((entry) => (
          <li
            key={String(entry.name)}
            className="flex items-center gap-2 text-muted-foreground"
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: entry.color }}
            />
            <span>{entry.name}</span>
            <span className="ml-auto pl-3 font-medium tabular-nums text-foreground">
              {typeof entry.value === 'number'
                ? entry.value.toFixed(digits)
                : entry.value}
              {unit}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function DonutChart({ data, unit }: { data: RankItem[]; unit: string }) {
  const reduced = usePrefersReducedMotion()
  const [active, setActive] = useState<number | null>(null)
  const total = data.reduce((sum, item) => sum + item.value, 0)
  const focus = active === null ? null : data[active]

  return (
    <div className="flex h-full flex-col items-center gap-6 sm:flex-row">
      <div className="relative h-44 w-44 shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="label"
              innerRadius="64%"
              outerRadius="96%"
              paddingAngle={2}
              cornerRadius={4}
              stroke="none"
              isAnimationActive={!reduced}
              onMouseEnter={(_, index) => setActive(index)}
              onMouseLeave={() => setActive(null)}
            >
              {data.map((item, index) => (
                <Cell
                  key={item.label}
                  fill={chartColor(index)}
                  opacity={active === null || active === index ? 1 : 0.3}
                  style={{ transition: 'opacity 200ms', outline: 'none' }}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-2xl font-semibold tabular-nums tracking-tight text-foreground">
            {focus ? focus.value : total}
          </span>
          <span className="text-[11px] text-muted-foreground">
            {focus ? focus.label : `TOP5 合计 · ${unit}`}
          </span>
        </div>
      </div>
      <ul className="w-full space-y-1">
        {data.map((item, index) => (
          <li
            key={item.label}
            onMouseEnter={() => setActive(index)}
            onMouseLeave={() => setActive(null)}
            className={cn(
              'flex items-center gap-2.5 rounded-md px-2 py-1.5 text-sm transition-colors',
              active === index && 'bg-muted/60',
            )}
          >
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ background: chartColor(index) }}
            />
            <span className="text-foreground/90">{item.label}</span>
            <span className="ml-auto tabular-nums text-muted-foreground">
              {Math.round((item.value / total) * 100)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function RankingBars({
  data,
  unit,
}: {
  data: RankItem[]
  unit: string
}) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const max = Math.max(...data.map((item) => item.value))

  return (
    <ol className="flex h-full flex-col justify-center gap-3.5">
      {data.map((item, index) => (
        <li key={item.label} className="group">
          <div className="mb-1.5 flex items-baseline gap-3 text-sm">
            <span className="font-mono text-xs tabular-nums text-muted-foreground/70">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="text-foreground/90">{item.label}</span>
            <span className="ml-auto tabular-nums text-muted-foreground">
              {item.value}
              <span className="ml-0.5 text-xs">{unit}</span>
            </span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary/60 to-primary transition-[width] duration-700 ease-out motion-reduce:transition-none"
              style={{
                width: mounted ? `${(item.value / max) * 100}%` : '0%',
                transitionDelay: `${index * 60}ms`,
              }}
            />
          </div>
        </li>
      ))}
    </ol>
  )
}

const quarters = ['Q1', 'Q2', 'Q3', 'Q4'] as const

export function QuarterlyBars({
  data,
  unit,
}: {
  data: QuarterlyRow[]
  unit: string
}) {
  const reduced = usePrefersReducedMotion()
  const rows = quarters.map((quarter, q) => {
    const row: Record<string, string | number> = { quarter }
    data.forEach((series) => {
      row[`y${series.year}`] = series.values[q]
    })
    return row
  })

  return (
    <div className="flex h-full flex-col">
      <ul className="mb-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
        {data.map((series, index) => (
          <li key={series.year} className="flex items-center gap-1.5">
            <span
              className="h-2 w-2 rounded-sm"
              style={{ background: chartColor(index) }}
            />
            {series.year}
          </li>
        ))}
      </ul>
      <div className="min-h-0 flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={rows} barCategoryGap="22%" barGap={2}>
            <CartesianGrid
              vertical={false}
              stroke={gridStroke}
              strokeDasharray="3 3"
            />
            <XAxis
              dataKey="quarter"
              tick={axisTick}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tick={axisTick}
              tickLine={false}
              axisLine={false}
              width={32}
              allowDecimals={false}
            />
            <Tooltip
              cursor={{ fill: 'hsl(var(--muted))', opacity: 0.5 }}
              content={(props) => (
                <ChartTooltip
                  active={props.active}
                  payload={props.payload as ReadonlyArray<TooltipEntry>}
                  label={props.label}
                  unit={unit}
                />
              )}
            />
            {data.map((series, index) => (
              <Bar
                key={series.year}
                dataKey={`y${series.year}`}
                name={series.year}
                fill={chartColor(index)}
                radius={[3, 3, 0, 0]}
                maxBarSize={14}
                isAnimationActive={!reduced}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

function RatingLegend() {
  return (
    <ul className="mb-3 flex gap-4 text-xs text-muted-foreground">
      <li className="flex items-center gap-1.5">
        <span className="h-0.5 w-4 rounded-full bg-primary" />
        我的评分
      </li>
      <li className="flex items-center gap-1.5">
        <span className="w-4 border-t-2 border-dashed border-muted-foreground/70" />
        豆瓣评分
      </li>
    </ul>
  )
}

function RatingCompare({ point }: { point: RatingPoint }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const diff = point.mine - point.douban
  const rows = [
    {
      label: '我的评分',
      value: point.mine,
      bar: 'bg-gradient-to-r from-primary/60 to-primary',
    },
    { label: '豆瓣评分', value: point.douban, bar: 'bg-muted-foreground/50' },
  ]

  return (
    <div className="flex h-full flex-col justify-center gap-6">
      <div className="flex items-baseline justify-between">
        <span className="text-sm text-muted-foreground">{point.year} 年</span>
        <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium tabular-nums text-primary">
          {diff >= 0 ? '+' : ''}
          {diff.toFixed(2)}
        </span>
      </div>
      {rows.map((row) => (
        <div key={row.label}>
          <div className="mb-2 flex items-baseline justify-between">
            <span className="text-sm text-foreground/90">{row.label}</span>
            <span className="text-2xl font-semibold tabular-nums tracking-tight text-foreground">
              {row.value.toFixed(2)}
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div
              className={cn(
                'h-full rounded-full transition-[width] duration-700 ease-out motion-reduce:transition-none',
                row.bar,
              )}
              style={{ width: mounted ? `${row.value * 10}%` : '0%' }}
            />
          </div>
        </div>
      ))}
      <p className="text-xs text-muted-foreground">满分 10 分</p>
    </div>
  )
}

export function RatingTrend({ data }: { data: RatingPoint[] }) {
  const reduced = usePrefersReducedMotion()
  const gradientId = `rating-${useId().replace(/:/g, '')}`

  if (data.length < 2) {
    return <RatingCompare point={data[0]} />
  }

  return (
    <div className="flex h-full flex-col">
      <RatingLegend />
      <div className="min-h-0 flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="hsl(var(--primary))"
                  stopOpacity={0.3}
                />
                <stop
                  offset="100%"
                  stopColor="hsl(var(--primary))"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              vertical={false}
              stroke={gridStroke}
              strokeDasharray="3 3"
            />
            <XAxis
              dataKey="year"
              tick={axisTick}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              domain={[5, 10]}
              ticks={[5, 6, 7, 8, 9, 10]}
              tick={axisTick}
              tickLine={false}
              axisLine={false}
              width={32}
            />
            <Tooltip
              cursor={{ stroke: 'hsl(var(--border))' }}
              content={(props) => (
                <ChartTooltip
                  active={props.active}
                  payload={props.payload as ReadonlyArray<TooltipEntry>}
                  label={props.label}
                  digits={2}
                />
              )}
            />
            <Area
              type="monotone"
              dataKey="douban"
              name="豆瓣评分"
              stroke="hsl(var(--muted-foreground))"
              strokeDasharray="4 4"
              strokeWidth={1.5}
              fill="transparent"
              dot={{
                r: 2.5,
                fill: 'hsl(var(--muted-foreground))',
                strokeWidth: 0,
              }}
              activeDot={{ r: 4, strokeWidth: 0 }}
              isAnimationActive={!reduced}
            />
            <Area
              type="monotone"
              dataKey="mine"
              name="我的评分"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              fill={`url(#${gradientId})`}
              dot={{ r: 3, fill: 'hsl(var(--primary))', strokeWidth: 0 }}
              activeDot={{ r: 5, strokeWidth: 0 }}
              isAnimationActive={!reduced}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
