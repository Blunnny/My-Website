'use client'

import { useState } from 'react'
import { Book, Film, Gamepad2, type LucideIcon } from 'lucide-react'
import {
  aboutStats,
  type StatCategory,
  type StatChart,
} from '@/config/aboutStats'
import { cn } from '@/lib/utils'
import {
  DonutChart,
  QuarterlyBars,
  RankingBars,
  RatingTrend,
} from './StatCharts'

const categoryIcons: Record<StatCategory['id'], LucideIcon> = {
  movies: Film,
  books: Book,
  games: Gamepad2,
}

type Kpi = {
  label: string
  value: string | number
  unit?: string
  hint: string
}

const average = (values: number[]) =>
  values.reduce((sum, value) => sum + value, 0) / values.length

function computeKpis(category: StatCategory): Kpi[] {
  const kpis: Kpi[] = []

  const quarterly = category.charts.find((chart) => chart.kind === 'quarterly')
  if (quarterly?.kind === 'quarterly' && quarterly.data.length > 0) {
    let total = 0
    let peak = { value: -1, year: '', quarter: 0 }
    quarterly.data.forEach((row) =>
      row.values.forEach((value, q) => {
        total += value
        if (value > peak.value) peak = { value, year: row.year, quarter: q + 1 }
      }),
    )
    const years = quarterly.data.map((row) => row.year)
    kpis.push({
      label: '共标记',
      value: total,
      unit: category.unit,
      hint: `${years[0]}–${years[years.length - 1]}`,
    })
    kpis.push({
      label: '单季最多',
      value: peak.value,
      unit: category.unit,
      hint: `${peak.year} Q${peak.quarter}`,
    })
  }

  const highlight = category.charts.find(
    (chart) =>
      (chart.kind === 'donut' || chart.kind === 'ranking') &&
      chart.highlightLabel,
  )
  if (
    highlight &&
    (highlight.kind === 'donut' || highlight.kind === 'ranking') &&
    highlight.data.length > 0
  ) {
    const top = highlight.data.reduce((best, item) =>
      item.value > best.value ? item : best,
    )
    kpis.push({
      label: highlight.highlightLabel ?? '',
      value: top.label,
      hint: `${top.value} ${highlight.unit}`,
    })
  }

  const rating = category.charts.find((chart) => chart.kind === 'rating')
  if (rating?.kind === 'rating' && rating.data.length > 0) {
    const mine = average(rating.data.map((point) => point.mine))
    const douban = average(rating.data.map((point) => point.douban))
    const diff = mine - douban
    kpis.push({
      label: '我的评分比豆瓣',
      value: `${diff >= 0 ? '+' : ''}${diff.toFixed(1)}`,
      hint: `年均分：我 ${mine.toFixed(1)} · 豆瓣 ${douban.toFixed(1)}`,
    })
  }

  return kpis
}

const kpiGridCols: Record<number, string> = {
  1: 'lg:grid-cols-1',
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
}

function KpiCard({ kpi }: { kpi: Kpi }) {
  const isLongText = typeof kpi.value === 'string' && kpi.value.length > 4
  return (
    <div className="rounded-2xl border border-border/70 bg-card/50 p-5">
      <p className="text-xs text-muted-foreground">{kpi.label}</p>
      <p className="mt-2 flex items-baseline gap-1">
        <span
          className={cn(
            'font-semibold tabular-nums tracking-tight text-foreground',
            isLongText ? 'text-xl' : 'text-3xl',
          )}
        >
          {kpi.value}
        </span>
        {kpi.unit && (
          <span className="text-sm text-muted-foreground">{kpi.unit}</span>
        )}
      </p>
      <p className="mt-1 text-xs text-muted-foreground/80">{kpi.hint}</p>
    </div>
  )
}

function ChartBody({ chart }: { chart: StatChart }) {
  switch (chart.kind) {
    case 'donut':
      return <DonutChart data={chart.data} unit={chart.unit} />
    case 'ranking':
      return <RankingBars data={chart.data} unit={chart.unit} />
    case 'quarterly':
      return <QuarterlyBars data={chart.data} unit={chart.unit} />
    case 'rating':
      return <RatingTrend data={chart.data} />
  }
}

export function AboutDashboard({ className }: { className?: string }) {
  const [activeId, setActiveId] = useState<StatCategory['id']>(aboutStats[0].id)
  const category =
    aboutStats.find((item) => item.id === activeId) ?? aboutStats[0]
  const kpis = computeKpis(category)

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-label="数据分类"
        className="inline-flex rounded-full border border-border/70 bg-muted/40 p-1"
      >
        {aboutStats.map((item) => {
          const Icon = categoryIcons[item.id]
          const selected = item.id === activeId
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActiveId(item.id)}
              className={cn(
                'flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm transition-colors duration-200',
                selected
                  ? 'bg-background text-foreground shadow-sm ring-1 ring-border/60'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              <Icon className={cn('h-4 w-4', selected && 'text-primary')} />
              {item.label}
            </button>
          )
        })}
      </div>

      <div
        key={category.id}
        role="tabpanel"
        className="mt-8 motion-safe:duration-300 motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-1"
      >
        {kpis.length > 0 && (
          <div
            className={cn(
              'grid grid-cols-2 gap-4',
              kpiGridCols[Math.min(kpis.length, 4)],
            )}
          >
            {kpis.map((kpi) => (
              <KpiCard key={kpi.label} kpi={kpi} />
            ))}
          </div>
        )}

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          {category.charts.map((chart) => (
            <section
              key={chart.title}
              className="flex flex-col rounded-2xl border border-border/70 bg-card/50 p-5 sm:p-6"
            >
              <h3 className="mb-5 text-sm font-semibold tracking-tight text-foreground">
                {chart.title}
              </h3>
              <div className={chart.kind === 'donut' ? 'sm:h-64' : 'h-64'}>
                <ChartBody chart={chart} />
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
