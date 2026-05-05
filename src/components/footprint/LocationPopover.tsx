'use client'

import { MapPin, X } from 'lucide-react'
import type { FootprintItemType } from '@/config/footprint'

type LocationPopoverProps = {
  item: FootprintItemType
  onClose: () => void
  // 屏幕坐标，用于将卡片定位到点位附近
  position?: { x: number; y: number }
  // 容器宽度，用于判断卡片是否会越出右边界
  containerWidth?: number
}

function formatYearMonth(yearMonth: string) {
  const trimmed = yearMonth.trim()
  // 仅年份，如 '2024'
  if (/^\d{4}$/.test(trimmed)) return `${trimmed} 年`
  // 年-月，如 '2024-04' 或 '2024-4'
  if (/^\d{4}-\d{1,2}$/.test(trimmed)) {
    const [year, month] = trimmed.split('-')
    return `${year} 年 ${parseInt(month, 10)} 月`
  }
  return trimmed
}

export default function LocationPopover({
  item,
  onClose,
  position,
  containerWidth,
}: LocationPopoverProps) {
  // 默认居中显示；若提供了 position，则贴近点位渲染
  const cardWidth = 260
  let style: React.CSSProperties = {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  }

  if (position) {
    const placeRight =
      containerWidth === undefined || position.x + cardWidth + 24 < containerWidth
    style = {
      position: 'absolute',
      top: position.y,
      left: placeRight ? position.x + 14 : undefined,
      right: placeRight
        ? undefined
        : containerWidth
          ? containerWidth - position.x + 14
          : undefined,
      transform: 'translateY(-50%)',
    }
  }

  // 按时间倒序展示
  const sortedVisits = [...item.visits].sort((a, b) =>
    a.yearMonth < b.yearMonth ? 1 : -1,
  )

  return (
    <div
      style={{ ...style, width: cardWidth }}
      className="z-20 rounded-xl border border-muted bg-background/95 p-4 shadow-lg backdrop-blur-md dark:bg-zinc-900/95"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <MapPin size={18} className="text-primary" />
          <div className="flex flex-col">
            <span className="text-base font-semibold leading-tight">
              {item.city}
            </span>
            <span className="text-xs text-muted-foreground">
              {item.country} · 共 {item.visits.length} 次
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="关闭"
          className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <X size={14} />
        </button>
      </div>

      <ul className="mt-3 space-y-2 border-t border-muted pt-3">
        {sortedVisits.map((visit, idx) => (
          <li
            key={idx}
            className="flex flex-col gap-0.5 text-sm leading-snug"
          >
            <span className="font-medium text-foreground">
              {formatYearMonth(visit.yearMonth)}
            </span>
            {visit.note && (
              <span className="text-xs text-muted-foreground">
                {visit.note}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
