'use client'

import { useMemo, useState } from 'react'
import {
  ArrowUpRight,
  Building2,
  Code,
  Gamepad2,
  GraduationCap,
  HeartPulse,
  Palette,
  Search,
  Shapes,
  ShoppingBag,
  TrendingUp,
  Wrench,
  X,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { FilterPill } from '@/components/ui/filter-pill'
import {
  categories,
  type MainCategory,
  type TagType,
  type WebsiteItem,
} from '@/config/treasureBox'

type SubMap = Record<string, WebsiteItem[]>

const mainCategories = Object.keys(categories) as MainCategory[]

const categoryIcons: Record<MainCategory, LucideIcon> = {
  实用工具: Wrench,
  公司数据: Building2,
  宏观数据: TrendingUp,
  艺术设计: Palette,
  医疗健康: HeartPulse,
  终身学习: GraduationCap,
  编程: Code,
  购物: ShoppingBag,
  游戏: Gamepad2,
  其他: Shapes,
}

const tagStyles: Record<TagType, string> = {
  免费: 'bg-emerald-500/10 text-emerald-700 ring-emerald-500/20 dark:text-emerald-300',
  无广告: 'bg-sky-500/10 text-sky-700 ring-sky-500/20 dark:text-sky-300',
  部分免费: 'bg-amber-500/10 text-amber-700 ring-amber-500/25 dark:text-amber-300',
  收费: 'bg-rose-500/10 text-rose-700 ring-rose-500/20 dark:text-rose-300',
  政府网站: 'bg-violet-500/10 text-violet-700 ring-violet-500/20 dark:text-violet-300',
  有广告: 'bg-rose-500/10 text-rose-700 ring-rose-500/20 dark:text-rose-300',
}

function subMapOf(category: MainCategory): SubMap {
  return categories[category] as SubMap
}

function countOf(category: MainCategory) {
  return Object.values(subMapOf(category)).reduce((n, list) => n + list.length, 0)
}

const totalCount = mainCategories.reduce((n, c) => n + countOf(c), 0)

function feePriority(tags: TagType[]) {
  if (tags.includes('免费')) return 1
  if (tags.includes('部分免费')) return 2
  if (tags.includes('收费')) return 3
  return 4
}

function adPriority(tags: TagType[]) {
  if (tags.includes('无广告')) return 1
  if (tags.includes('有广告')) return 2
  return 3
}

// 政府网站优先，其次按费用、广告排序
function sortItems<T extends { item: WebsiteItem }>(list: T[]) {
  return [...list].sort((a, b) => {
    const aGov = a.item.tags.includes('政府网站')
    const bGov = b.item.tags.includes('政府网站')
    if (aGov !== bGov) return aGov ? -1 : 1
    const feeDiff = feePriority(a.item.tags) - feePriority(b.item.tags)
    if (feeDiff !== 0) return feeDiff
    return adPriority(a.item.tags) - adPriority(b.item.tags)
  })
}

function hostnameOf(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}

type Entry = { item: WebsiteItem; main: MainCategory; sub: string }

function SiteRow({ entry, showPath }: { entry: Entry; showPath: boolean }) {
  const { item } = entry

  return (
    <li className="group relative px-4 py-4 transition-colors duration-200 hover:bg-muted/40 sm:px-5">
      <div className="min-w-0">
        <div className="flex flex-col gap-1.5 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <div className="min-w-0">
            <h3 className="flex items-center gap-1 font-semibold text-foreground transition-colors group-hover:text-primary">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="truncate before:absolute before:inset-0 before:content-['']"
              >
                {item.title}
              </a>
              <ArrowUpRight className="h-3.5 w-3.5 shrink-0 opacity-0 transition-all duration-200 group-hover:opacity-100 motion-safe:-translate-x-0.5 motion-safe:group-hover:translate-x-0" />
            </h3>
            <p className="mt-0.5 truncate text-xs text-muted-foreground/80">
              {showPath && (
                <span className="text-primary/80">
                  {entry.main} / {entry.sub}
                  <span className="mx-1.5 text-muted-foreground/50">·</span>
                </span>
              )}
              {hostnameOf(item.url)}
            </p>
          </div>
          {item.tags.length > 0 && (
            <div className="flex shrink-0 flex-wrap gap-1.5">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className={cn(
                    'inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset',
                    tagStyles[tag],
                  )}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {item.description}
        </p>
      </div>
    </li>
  )
}

function SiteList({
  entries,
  showPath = false,
  listKey,
}: {
  entries: Entry[]
  showPath?: boolean
  listKey: string
}) {
  return (
    <ul
      key={listKey}
      role="list"
      className="divide-y divide-border/60 overflow-hidden rounded-2xl border border-border/70 bg-card/50 motion-safe:duration-300 motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-1"
    >
      {entries.map((entry, i) => (
        <SiteRow
          key={`${entry.item.url}-${i}`}
          entry={entry}
          showPath={showPath}
        />
      ))}
    </ul>
  )
}

export function TreasureBrowser() {
  const [main, setMain] = useState<MainCategory>('实用工具')
  const [sub, setSub] = useState<string>('音视频处理')
  const [query, setQuery] = useState('')

  const subMap = subMapOf(main)
  const subCategories = Object.keys(subMap)
  const keyword = query.trim().toLowerCase()

  const currentEntries = useMemo(
    () => sortItems((subMap[sub] ?? []).map((item) => ({ item, main, sub }))),
    [subMap, main, sub],
  )

  const searchEntries = useMemo(() => {
    if (!keyword) return []
    const hits: Entry[] = []
    for (const m of mainCategories) {
      for (const [s, list] of Object.entries(subMapOf(m))) {
        for (const item of list) {
          const haystack =
            `${item.title} ${item.description} ${hostnameOf(item.url)}`.toLowerCase()
          if (haystack.includes(keyword)) hits.push({ item, main: m, sub: s })
        }
      }
    }
    return sortItems(hits)
  }, [keyword])

  function selectMain(category: MainCategory) {
    setMain(category)
    setSub(Object.keys(subMapOf(category))[0])
    setQuery('')
  }

  function navButton(category: MainCategory, compact: boolean) {
    const Icon = categoryIcons[category]
    const active = !keyword && main === category
    return (
      <button
        key={category}
        type="button"
        aria-current={active ? 'page' : undefined}
        onClick={() => selectMain(category)}
        className={cn(
          'group/nav flex shrink-0 items-center gap-2.5 text-sm transition-colors duration-200',
          compact
            ? 'rounded-full border px-3.5 py-1.5'
            : 'relative w-full rounded-lg px-3 py-2 text-left',
          compact &&
            (active
              ? 'border-primary bg-primary text-primary-foreground'
              : 'border-border bg-background text-foreground hover:border-primary/40'),
          !compact &&
            (active
              ? 'bg-muted font-medium text-foreground'
              : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'),
        )}
      >
        {!compact && active && (
          <span
            aria-hidden
            className="absolute inset-y-2 left-0 w-0.5 rounded-full bg-primary"
          />
        )}
        <Icon
          className={cn(
            'h-4 w-4 shrink-0',
            !compact && (active ? 'text-primary' : 'opacity-70'),
          )}
        />
        <span className={compact ? '' : 'flex-1'}>{category}</span>
        <span className="text-xs tabular-nums opacity-60">
          {countOf(category)}
        </span>
      </button>
    )
  }

  return (
    <div>
      <div className="relative mb-8">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Escape' && setQuery('')}
          placeholder={`在 ${totalCount} 个网站中搜索名称、描述或域名`}
          aria-label="搜索网站"
          className="h-11 w-full rounded-xl border border-border/70 bg-card/50 pl-11 pr-10 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary/50 focus:ring-2 focus:ring-primary/15 [&::-webkit-search-cancel-button]:hidden"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            aria-label="清除搜索"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="lg:grid lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-10">
        <aside className="hidden lg:block">
          <nav aria-label="主分类" className="sticky top-24 space-y-0.5">
            {mainCategories.map((c) => navButton(c, false))}
          </nav>
        </aside>

        <nav
          aria-label="主分类"
          className="-mx-4 mb-5 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] lg:hidden [&::-webkit-scrollbar]:hidden"
        >
          {mainCategories.map((c) => navButton(c, true))}
        </nav>

        <section className="min-w-0">
          {keyword ? (
            <>
              <div className="mb-5 flex items-baseline justify-between gap-4">
                <h2 className="section-title">搜索结果</h2>
                <span className="text-sm tabular-nums text-muted-foreground">
                  {searchEntries.length} 个匹配
                </span>
              </div>
              {searchEntries.length > 0 ? (
                <SiteList entries={searchEntries} showPath listKey={keyword} />
              ) : (
                <p className="rounded-2xl border border-dashed border-border/70 px-5 py-12 text-center text-sm text-muted-foreground">
                  没有找到与「{query.trim()}」相关的网站
                </p>
              )}
            </>
          ) : (
            <>
              <div className="mb-6 flex flex-wrap gap-2">
                {subCategories.map((s) => (
                  <FilterPill key={s} active={sub === s} onClick={() => setSub(s)}>
                    {s}
                    <span className="ml-1.5 text-xs tabular-nums opacity-60">
                      {subMap[s].length}
                    </span>
                  </FilterPill>
                ))}
              </div>
              <div className="mb-4 flex items-baseline justify-between gap-4">
                <h2 className="section-title">{sub}</h2>
                <span className="text-sm tabular-nums text-muted-foreground">
                  {currentEntries.length} 个网站
                </span>
              </div>
              <SiteList entries={currentEntries} listKey={`${main}-${sub}`} />
            </>
          )}
        </section>
      </div>
    </div>
  )
}
