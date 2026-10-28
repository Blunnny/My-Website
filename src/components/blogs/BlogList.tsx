'use client'

import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, X } from 'lucide-react'
import { type BlogType } from '@/lib/blogs'
import { cn } from '@/lib/utils'
import { FilterPill } from '@/components/ui/filter-pill'
import { BlogRows } from './BlogRow'
import { Pagination } from './Pagination'
import {
  ALL,
  collectionCategoryLabels,
  flatCategoryDirs,
  isCollected,
  labelToDir,
  myCategoryLabels,
  mySubCategoryLabels,
  primaryCategories,
  type PrimaryCategory,
} from '@/lib/blogCategories'

const BLOGS_PER_PAGE = 10
const SCROLL_KEY = 'blogListScrollPosition'

type Option = { label: string; dir: string; count: number }

function saveScrollPosition() {
  sessionStorage.setItem(SCROLL_KEY, window.scrollY.toString())
}

function optionsOf(
  blogs: BlogType[],
  dirOf: (blog: BlogType) => string | undefined,
  labels: Record<string, string>,
): Option[] {
  const counts = new Map<string, number>()
  for (const blog of blogs) {
    const dir = dirOf(blog)
    if (dir) counts.set(dir, (counts.get(dir) ?? 0) + 1)
  }
  return Array.from(counts.keys())
    .sort()
    .map((dir) => ({ dir, label: labels[dir] ?? dir, count: counts.get(dir)! }))
}

function BlogListContent({ initialBlogs }: { initialBlogs: BlogType[] }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const listRef = useRef<HTMLDivElement>(null)
  const [query, setQuery] = useState('')

  const primary: PrimaryCategory =
    searchParams.get('primaryCategory') === '文章收藏' ? '文章收藏' : '我的博客'
  const category = searchParams.get('category') || ALL
  const subCategory = searchParams.get('subCategory') || ALL
  const currentPage = Math.max(1, Number(searchParams.get('page')) || 1)
  const keyword = query.trim().toLowerCase()

  useEffect(() => {
    const saved = sessionStorage.getItem(SCROLL_KEY)
    if (!saved) return
    const timer = setTimeout(() => {
      window.scrollTo(0, parseInt(saved, 10))
      sessionStorage.removeItem(SCROLL_KEY)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  const myBlogs = useMemo(
    () => initialBlogs.filter((blog) => !isCollected(blog)),
    [initialBlogs],
  )
  const collectedBlogs = useMemo(
    () => initialBlogs.filter(isCollected),
    [initialBlogs],
  )
  const pool = primary === '我的博客' ? myBlogs : collectedBlogs

  const categoryOptions =
    primary === '我的博客'
      ? optionsOf(myBlogs, (b) => b.category, myCategoryLabels)
      : optionsOf(
          collectedBlogs,
          (b) => (b.category ? b.subCategory : undefined),
          collectionCategoryLabels,
        )

  const activeDir =
    primary === '我的博客'
      ? labelToDir(myCategoryLabels, category)
      : labelToDir(collectionCategoryLabels, category)

  const childOptions =
    primary === '我的博客' &&
    category !== ALL &&
    !flatCategoryDirs.includes(activeDir)
      ? optionsOf(
          myBlogs.filter((b) => b.category === activeDir),
          (b) => b.subCategory,
          mySubCategoryLabels[activeDir] ?? {},
        )
      : []
  const activeChildDir = labelToDir(
    mySubCategoryLabels[activeDir] ?? {},
    subCategory,
  )

  const filtered = useMemo(() => {
    if (category === ALL) return pool
    if (primary === '文章收藏') {
      return pool.filter(
        (b) => b.category === 'collect' && b.subCategory === activeDir,
      )
    }
    return pool.filter(
      (b) =>
        b.category === activeDir &&
        (subCategory === ALL ||
          childOptions.length <= 1 ||
          b.subCategory === activeChildDir),
    )
  }, [pool, primary, category, subCategory, activeDir, activeChildDir, childOptions.length])

  const searchResults = useMemo(() => {
    if (!keyword) return []
    return initialBlogs.filter((blog) =>
      [blog.title, blog.description, ...(blog.tags ?? [])]
        .join(' ')
        .toLowerCase()
        .includes(keyword),
    )
  }, [initialBlogs, keyword])

  const totalPages = Math.ceil(filtered.length / BLOGS_PER_PAGE)
  const page = Math.min(currentPage, Math.max(totalPages, 1))
  const pageBlogs = filtered.slice(
    (page - 1) * BLOGS_PER_PAGE,
    page * BLOGS_PER_PAGE,
  )

  function hrefFor(next: {
    primary?: PrimaryCategory
    category?: string
    subCategory?: string
    page?: number
  }) {
    const p = next.primary ?? primary
    const c = next.category ?? category
    const s = next.subCategory ?? ALL
    const params = new URLSearchParams()
    params.set('primaryCategory', p)
    params.set('category', c)
    if (p === '我的博客' && c !== ALL) params.set('subCategory', s)
    params.set('page', String(next.page ?? 1))
    return `/blogs?${params.toString()}`
  }

  function go(href: string) {
    router.push(href, { scroll: false })
  }

  function scrollToList() {
    listRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div ref={listRef} className="scroll-mt-24">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div
          role="tablist"
          aria-label="文章类型"
          className="inline-flex w-fit rounded-full border border-border/70 bg-muted/50 p-1"
        >
          {primaryCategories.map((item) => {
            const active = !keyword && primary === item
            return (
              <button
                key={item}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => {
                  setQuery('')
                  go(hrefFor({ primary: item, category: ALL }))
                }}
                className={cn(
                  'rounded-full px-4 py-1.5 text-sm transition-all duration-200',
                  active
                    ? 'bg-background font-medium text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {item}
                <span className="ml-1.5 text-xs tabular-nums opacity-60">
                  {(item === '我的博客' ? myBlogs : collectedBlogs).length}
                </span>
              </button>
            )
          })}
        </div>

        <div className="relative sm:w-64">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Escape' && setQuery('')}
            placeholder="搜索标题、描述或标签"
            aria-label="搜索文章"
            className="h-10 w-full rounded-full border border-border/70 bg-card/50 pl-10 pr-9 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary/50 focus:ring-2 focus:ring-primary/15 [&::-webkit-search-cancel-button]:hidden"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label="清除搜索"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {keyword ? (
        <>
          <p className="mb-4 text-sm text-muted-foreground">
            找到 <span className="tabular-nums text-foreground">{searchResults.length}</span> 篇与「{query.trim()}」相关的文章
          </p>
          {searchResults.length > 0 ? (
            <BlogRows
              blogs={searchResults}
              onNavigate={saveScrollPosition}
              listKey={`search-${keyword}`}
            />
          ) : (
            <p className="rounded-2xl border border-dashed border-border/70 px-5 py-12 text-center text-sm text-muted-foreground">
              没有找到相关文章
            </p>
          )}
        </>
      ) : (
        <>
          <div className="mb-6 space-y-3">
            <div className="flex flex-wrap gap-2">
              <FilterPill
                active={category === ALL}
                onClick={() => go(hrefFor({ category: ALL }))}
              >
                {ALL}
                <span className="ml-1.5 text-xs tabular-nums opacity-60">
                  {pool.length}
                </span>
              </FilterPill>
              {categoryOptions.map((option) => (
                <FilterPill
                  key={option.dir}
                  active={category === option.label}
                  onClick={() => go(hrefFor({ category: option.label }))}
                >
                  {option.label}
                  <span className="ml-1.5 text-xs tabular-nums opacity-60">
                    {option.count}
                  </span>
                </FilterPill>
              ))}
            </div>

            {childOptions.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 border-l-2 border-primary/30 pl-3">
                {childOptions.length > 1 && (
                  <FilterPill
                    active={subCategory === ALL}
                    onClick={() =>
                      go(hrefFor({ category, subCategory: ALL }))
                    }
                    className="px-3 py-0.5 text-xs"
                  >
                    {ALL}
                  </FilterPill>
                )}
                {childOptions.map((option) => (
                  <FilterPill
                    key={option.dir}
                    active={
                      childOptions.length === 1 ||
                      subCategory === option.label
                    }
                    onClick={() =>
                      go(hrefFor({ category, subCategory: option.label }))
                    }
                    className="px-3 py-0.5 text-xs"
                  >
                    {option.label}
                    <span className="ml-1 tabular-nums opacity-60">
                      {option.count}
                    </span>
                  </FilterPill>
                ))}
              </div>
            )}
          </div>

          {pageBlogs.length > 0 ? (
            <BlogRows
              blogs={pageBlogs}
              onNavigate={saveScrollPosition}
              listKey={`${primary}-${category}-${subCategory}-${page}`}
            />
          ) : (
            <p className="rounded-2xl border border-dashed border-border/70 px-5 py-12 text-center text-sm text-muted-foreground">
              这里还没有文章
            </p>
          )}

          <Pagination
            current={page}
            total={totalPages}
            hrefFor={(p) => hrefFor({ category, subCategory, page: p })}
            onNavigate={scrollToList}
            scroll={false}
          />
        </>
      )}
    </div>
  )
}

export function BlogList(props: { initialBlogs: BlogType[] }) {
  return (
    <Suspense fallback={null}>
      <BlogListContent {...props} />
    </Suspense>
  )
}
