'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from 'react-simple-maps'
import { geoEqualEarth } from 'd3-geo'
import { useTheme } from 'next-themes'
import LocationPopover from './LocationPopover'
import {
  countryNameToIsoCode,
  type FootprintItemType,
} from '@/config/footprint'

const GEO_URL = '/data/world-110m.json'
// ComposableMap 内部 viewBox 与 projection 使用的 base scale，与 ComposableMap 默认一致
const BASE_WIDTH = 800
const BASE_HEIGHT = 600
const PROJECTION_SCALE = 165
const INITIAL_CENTER: [number, number] = [10, 20]

type WorldMapProps = {
  items: FootprintItemType[]
}

type Transform = {
  coordinates: [number, number]
  zoom: number
}

export default function WorldMap({ items }: WorldMapProps) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [transform, setTransform] = useState<Transform>({
    coordinates: INITIAL_CENTER,
    zoom: 1,
  })
  const [containerSize, setContainerSize] = useState({
    width: 0,
    height: 0,
  })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  // 监听容器尺寸（用于把 SVG 内坐标转换为屏幕坐标）
  useEffect(() => {
    if (!containerRef.current) return
    const el = containerRef.current
    const update = () => {
      const rect = el.getBoundingClientRect()
      setContainerSize({ width: rect.width, height: rect.height })
    }
    update()
    const observer = new ResizeObserver(update)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const isDark = mounted && resolvedTheme === 'dark'

  // 配色：与现有亮/暗主题保持一致
  const palette = useMemo(
    () =>
      isDark
        ? {
            land: '#27272a',
            landHover: '#3f3f46',
            landVisited: '#1e3a8a', // 已到访国家：深蓝色块
            landVisitedHover: '#1d4ed8',
            stroke: '#3f3f46',
            point: '#60a5fa',
            pointHalo: 'rgba(96,165,250,0.25)',
            pointHover: '#fbbf24',
            pointStroke: '#0a0a0a',
            cityLabel: '#fafafa',
            cityLabelStroke: '#0a0a0a',
          }
        : {
            land: '#f4f4f5',
            landHover: '#e4e4e7',
            landVisited: '#dbeafe', // 已到访国家：淡蓝色块
            landVisitedHover: '#bfdbfe',
            stroke: '#d4d4d8',
            point: '#2563eb',
            pointHalo: 'rgba(37,99,235,0.25)',
            pointHover: '#f59e0b',
            pointStroke: '#ffffff',
            cityLabel: '#111827',
            cityLabelStroke: '#ffffff',
          },
    [isDark],
  )

  // 已到访国家 ISO numeric code 集合
  const visitedCountryIds = useMemo(() => {
    const set = new Set<string>()
    items.forEach((item) => {
      const code = countryNameToIsoCode[item.country]
      if (code) {
        // ISO numeric code 可能有前导零（如奥地利 040），topojson 中是字符串数字
        // 同时存"040"和"40"两种形式以兼容
        set.add(code)
        set.add(String(parseInt(code, 10)))
      }
    })
    return set
  }, [items])

  // d3-geo 投影：和 ComposableMap 内部使用的等积地球投影一致
  const projection = useMemo(() => {
    return geoEqualEarth()
      .scale(PROJECTION_SCALE)
      .translate([BASE_WIDTH / 2, BASE_HEIGHT / 2])
  }, [])

  // 安全获取 [lng, lat]：onMove 回调偶尔传入异形对象，做防御
  const isValidLonLat = (v: unknown): v is [number, number] =>
    Array.isArray(v) &&
    v.length === 2 &&
    typeof v[0] === 'number' &&
    typeof v[1] === 'number' &&
    Number.isFinite(v[0]) &&
    Number.isFinite(v[1])

  // 根据当前 transform，把经纬度投影到屏幕像素坐标（容器内 left/top）
  const projectToScreen = useMemo(() => {
    return (lonLat: [number, number]): { x: number; y: number } | null => {
      const { width, height } = containerSize
      if (!width || !height) return null
      if (!isValidLonLat(lonLat)) return null
      const center = isValidLonLat(transform.coordinates)
        ? transform.coordinates
        : INITIAL_CENTER
      const zoom =
        typeof transform.zoom === 'number' && Number.isFinite(transform.zoom)
          ? transform.zoom
          : 1
      const p = projection(lonLat)
      const c = projection(center)
      if (!p || !c) return null
      // ComposableMap 默认 viewBox=0 0 800 600，preserveAspectRatio="xMidYMid meet"
      // 实际屏幕缩放比例（保持纵横比）
      const scale = Math.min(width / BASE_WIDTH, height / BASE_HEIGHT)
      const offsetX = (width - BASE_WIDTH * scale) / 2
      const offsetY = (height - BASE_HEIGHT * scale) / 2
      // 应用 ZoomableGroup 的 transform：以 center 为基准 zoom 倍缩放
      const svgX = (p[0] - c[0]) * zoom + BASE_WIDTH / 2
      const svgY = (p[1] - c[1]) * zoom + BASE_HEIGHT / 2
      return {
        x: offsetX + svgX * scale,
        y: offsetY + svgY * scale,
      }
    }
  }, [containerSize, projection, transform])

  // 当前激活的地点 + 屏幕坐标（实时跟随地图）
  const activeItem = activeId ? items.find((i) => i.id === activeId) : null
  const popoverPos = activeItem
    ? projectToScreen(activeItem.coordinates)
    : null

  // 点位半径：随 zoom 反向缩放，确保屏幕大小近似恒定，相邻地点能区分
  const getPointRadius = (count: number, zoom: number) => {
    const base = 4 + Math.min(count, 6) * 0.8 // 4 ~ 8.8
    return Math.max(1.6, base / Math.sqrt(zoom))
  }

  return (
    <div
      ref={containerRef}
      className="relative h-[320px] w-full overflow-hidden rounded-2xl border border-muted bg-background/40 sm:h-[420px] md:h-[500px]"
      onClick={() => setActiveId(null)}
    >
      <ComposableMap
        projection="geoEqualEarth"
        projectionConfig={{ scale: PROJECTION_SCALE }}
        width={BASE_WIDTH}
        height={BASE_HEIGHT}
        style={{ width: '100%', height: '100%' }}
      >
        <ZoomableGroup
          center={INITIAL_CENTER}
          zoom={1}
          minZoom={1}
          maxZoom={18}
          onMove={(position: any) => {
            // react-simple-maps 偶发传入 d3-zoom 原始 transform({x,y,k}) 而非 {coordinates, zoom}
            // 做防御后再写入 state，避免污染导致 projection 崩溃
            const coords = position?.coordinates
            const zoom = position?.zoom
            if (
              Array.isArray(coords) &&
              coords.length === 2 &&
              typeof coords[0] === 'number' &&
              typeof coords[1] === 'number' &&
              typeof zoom === 'number' &&
              Number.isFinite(zoom)
            ) {
              setTransform({
                coordinates: [coords[0], coords[1]],
                zoom,
              })
            }
          }}
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const geoId = String(geo.id ?? '')
                const visited = visitedCountryIds.has(geoId)
                const fill = visited ? palette.landVisited : palette.land
                const fillHover = visited
                  ? palette.landVisitedHover
                  : palette.landHover
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    style={{
                      default: {
                        fill,
                        stroke: palette.stroke,
                        strokeWidth: 0.4 / transform.zoom,
                        outline: 'none',
                      },
                      hover: {
                        fill: fillHover,
                        stroke: palette.stroke,
                        strokeWidth: 0.4 / transform.zoom,
                        outline: 'none',
                      },
                      pressed: {
                        fill: fillHover,
                        stroke: palette.stroke,
                        strokeWidth: 0.4 / transform.zoom,
                        outline: 'none',
                      },
                    }}
                  />
                )
              })
            }
          </Geographies>

          {items.map((item) => {
            const radius = getPointRadius(item.visits.length, transform.zoom)
            const isHover = hoveredId === item.id
            const isActive = activeId === item.id
            const strokeWidth = 1.2 / Math.sqrt(transform.zoom)
            return (
              <Marker
                key={item.id}
                coordinates={item.coordinates}
                onClick={(e) => {
                  e.stopPropagation()
                  setActiveId(item.id)
                }}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  default: { cursor: 'pointer', outline: 'none' },
                  hover: { cursor: 'pointer', outline: 'none' },
                  pressed: { cursor: 'pointer', outline: 'none' },
                }}
              >
                {/* 光晕 */}
                <circle
                  r={radius + 4 / Math.sqrt(transform.zoom)}
                  fill={palette.pointHalo}
                  style={{
                    transition: 'opacity 200ms',
                    opacity: isHover || isActive ? 1 : 0.55,
                  }}
                />
                {/* 主点 */}
                <circle
                  r={radius}
                  fill={isHover || isActive ? palette.pointHover : palette.point}
                  stroke={palette.pointStroke}
                  strokeWidth={strokeWidth}
                  style={{ transition: 'fill 200ms' }}
                />
                {/* 悬停时显示城市名 */}
                {isHover && !isActive && (
                  <text
                    textAnchor="middle"
                    y={-radius - 6 / Math.sqrt(transform.zoom)}
                    style={{
                      fontSize: 11 / Math.sqrt(transform.zoom),
                      fontWeight: 600,
                      fill: palette.cityLabel,
                      paintOrder: 'stroke',
                      stroke: palette.cityLabelStroke,
                      strokeWidth: 3 / Math.sqrt(transform.zoom),
                      strokeLinejoin: 'round',
                      pointerEvents: 'none',
                      userSelect: 'none',
                    }}
                  >
                    {item.city}
                  </text>
                )}
              </Marker>
            )
          })}
        </ZoomableGroup>
      </ComposableMap>

      {/* 详情卡片：用 d3-geo 实时投影到屏幕坐标，跟随地图平移与缩放 */}
      {activeItem && popoverPos && (
        <LocationPopover
          item={activeItem}
          position={popoverPos}
          containerWidth={containerSize.width}
          onClose={() => setActiveId(null)}
        />
      )}

      {/* 角落提示 */}
      <div className="pointer-events-none absolute bottom-2 right-3 select-none text-[10px] text-muted-foreground/70">
        滚轮缩放 · 拖拽平移 · 点击地点查看详情
      </div>
    </div>
  )
}
