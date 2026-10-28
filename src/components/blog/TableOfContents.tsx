'use client'

import { useEffect, useState } from 'react'
import { clsx } from 'clsx'
import { List, X } from 'lucide-react'

interface Heading {
  id: string
  text: string
  level: number
}

const HEADING_SELECTOR =
  '[data-mdx-content] :is(h1, h2, h3, h4)[id]'
const ACTIVE_OFFSET = 120

function useHeadings() {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>()

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(HEADING_SELECTOR),
    )
    setHeadings(
      elements.map((elem) => ({
        id: elem.id,
        text: elem.innerText,
        level: Number(elem.tagName.substring(1)),
      })),
    )
    if (elements.length === 0) return

    let frame = 0
    const update = () => {
      frame = 0
      let current = elements[0].id
      for (const elem of elements) {
        if (elem.getBoundingClientRect().top - ACTIVE_OFFSET > 0) break
        current = elem.id
      }
      setActiveId(current)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return { headings, activeId }
}

function HeadingList({
  headings,
  activeId,
  onSelect,
}: {
  headings: Heading[]
  activeId?: string
  onSelect?: () => void
}) {
  const minLevel = Math.min(...headings.map((h) => h.level))
  return (
    <ul className="space-y-0.5 border-l border-border/70">
      {headings.map((heading) => {
        const active = heading.id === activeId
        return (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              onClick={onSelect}
              aria-current={active ? 'location' : undefined}
              style={{ paddingLeft: `${0.75 + (heading.level - minLevel) * 0.75}rem` }}
              className={clsx(
                '-ml-px block border-l py-1 pr-2 text-[13px] leading-snug transition-colors duration-200',
                active
                  ? 'border-primary font-medium text-primary'
                  : 'border-transparent text-muted-foreground hover:border-border hover:text-foreground',
              )}
            >
              {heading.text}
            </a>
          </li>
        )
      })}
    </ul>
  )
}

export function TableOfContents() {
  const { headings, activeId } = useHeadings()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen])

  if (headings.length === 0) return null

  return (
    <>
      {/* 宽屏：正文左侧常驻 */}
      <aside className="absolute right-full top-0 mr-10 hidden h-full w-52 print:hidden xl:block">
        <nav
          aria-label="文章目录"
          className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pb-6 [scrollbar-width:thin]"
        >
          <p className="section-kicker mb-4">目录</p>
          <HeadingList headings={headings} activeId={activeId} />
        </nav>
      </aside>

      {/* 窄屏：悬浮按钮 + 抽屉 */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="打开目录"
        className="fixed bottom-6 left-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-background/90 text-muted-foreground shadow-lg backdrop-blur transition-colors hover:border-primary/40 hover:text-primary print:hidden xl:hidden"
      >
        <List className="h-5 w-5" />
      </button>

      <div
        aria-hidden
        onClick={() => setIsOpen(false)}
        className={clsx(
          'fixed inset-0 z-50 bg-black/20 backdrop-blur-sm transition-opacity duration-300 dark:bg-black/40 xl:hidden',
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
      />
      <div
        role="dialog"
        aria-label="文章目录"
        aria-hidden={!isOpen}
        className={clsx(
          'fixed left-0 top-0 z-50 flex h-full w-72 max-w-[85vw] flex-col border-r border-border bg-background shadow-xl transition-transform duration-300 ease-out xl:hidden',
          isOpen ? 'translate-x-0' : 'pointer-events-none -translate-x-full',
        )}
      >
        <div className="flex items-center justify-between border-b border-border/70 px-5 py-4">
          <p className="section-kicker">目录</p>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="关闭目录"
            className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-5 py-4">
          <HeadingList
            headings={headings}
            activeId={activeId}
            onSelect={() => setIsOpen(false)}
          />
        </nav>
      </div>
    </>
  )
}
