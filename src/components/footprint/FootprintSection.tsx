'use client'

import dynamic from 'next/dynamic'
import { MapPin } from 'lucide-react'
import {
  footprintHeadLine,
  footprintIntro,
  footprints,
} from '@/config/footprint'

// 地图依赖浏览器 API（fetch topojson、ResizeObserver），禁用 SSR 避免 hydration 不一致
const WorldMap = dynamic(() => import('./WorldMap'), {
  ssr: false,
  loading: () => (
    <div className="h-[320px] w-full animate-pulse rounded-2xl border border-muted bg-muted/30 sm:h-[420px] md:h-[500px]" />
  ),
})

export default function FootprintSection() {
  // 统计：去过多少国家、城市、总次数
  const countries = new Set(footprints.map((f) => f.country)).size
  const cities = footprints.length
  const totalVisits = footprints.reduce((sum, f) => sum + f.visits.length, 0)

  return (
    <div className="mx-auto my-4 flex max-w-xl flex-col gap-6 border-t border-muted py-8 lg:max-w-none">
      <h2 className="mb-2 flex flex-row items-center justify-start gap-2 text-xl font-semibold tracking-tight opacity-80 md:text-3xl">
        <MapPin size={28} className="shrink-0" />
        <span
          className="project-animated-title text-xl font-semibold text-black dark:text-white md:text-3xl"
          style={{
            position: 'relative',
            display: 'inline-block',
            color: 'inherit',
            WebkitTextStroke: 'unset',
          }}
        >
          {'　' + footprintHeadLine + '　'}
          <span className="hover-text" aria-hidden="true">
            {'　' + footprintHeadLine + '　'}
          </span>
        </span>
      </h2>

      <p className="max-w-2xl text-base text-muted-foreground">
        {footprintIntro}
      </p>

      {/* 统计条 */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
        <span className="text-muted-foreground">
          已踏足{' '}
          <span className="text-base font-semibold text-foreground">
            {countries}
          </span>{' '}
          个国家/地区
        </span>
        <span className="text-muted-foreground">
          走过{' '}
          <span className="text-base font-semibold text-foreground">
            {cities}
          </span>{' '}
          座城市
        </span>
      </div>

      <WorldMap items={footprints} />
    </div>
  )
}
