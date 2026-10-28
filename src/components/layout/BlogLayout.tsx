'use client'

import { useContext } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ArrowRight } from 'lucide-react'

import { AppContext } from '@/app/providers'
import { Container } from '@/components/layout/Container'
import { Prose } from '@/components/shared/Prose'
import { type BlogType } from '@/lib/blogs'
import { formatDate } from '@/lib/formatDate'
import {
  categoryHref,
  categoryPath,
  displayTags,
  isCollected,
} from '@/lib/blogCategories'
import { TableOfContents } from '@/components/blog/TableOfContents'

type BlogLink = { slug: string; title: string }

function Dot() {
  return <span className="text-muted-foreground/40">·</span>
}

function hostnameOf(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}

function SiblingLink({
  blog,
  direction,
}: {
  blog?: BlogLink
  direction: 'prev' | 'next'
}) {
  if (!blog) return <div className="hidden sm:block" />
  const isPrev = direction === 'prev'
  return (
    <Link
      href={`/blogs/${blog.slug}`}
      className={`group flex flex-col gap-1.5 rounded-2xl border border-border/70 bg-card/50 p-4 transition-colors duration-200 hover:border-primary/40 hover:bg-muted/40 ${
        isPrev ? '' : 'sm:items-end sm:text-right'
      }`}
    >
      <span className="flex items-center gap-1 text-xs text-muted-foreground">
        {isPrev && (
          <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-200 motion-safe:group-hover:-translate-x-0.5" />
        )}
        {isPrev ? '上一篇' : '下一篇'}
        {!isPrev && (
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 motion-safe:group-hover:translate-x-0.5" />
        )}
      </span>
      <span className="text-sm font-medium leading-snug text-foreground transition-colors group-hover:text-primary">
        {blog.title}
      </span>
    </Link>
  )
}

export function BlogLayout({
  blog,
  prev,
  next,
  children,
}: {
  blog: BlogType
  prev?: BlogLink
  next?: BlogLink
  children: React.ReactNode
}) {
  let router = useRouter()
  let { previousPathname } = useContext(AppContext)
  const { primary, category, sub } = categoryPath(blog)
  const tags = displayTags(blog)

  return (
    <Container className="mt-16 lg:mt-28">
      <div className="relative mx-auto max-w-2xl">
        <TableOfContents />

        {previousPathname ? (
          <button
            type="button"
            onClick={() => router.back()}
            className="group mb-10 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-200 motion-safe:group-hover:-translate-x-0.5" />
            返回
          </button>
        ) : (
          <Link
            href="/blogs"
            className="group mb-10 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-200 motion-safe:group-hover:-translate-x-0.5" />
            全部文章
          </Link>
        )}

        <article>
          <header>
            <p className="flex flex-wrap items-center gap-x-2 text-xs font-medium tracking-wide">
              <span className="text-muted-foreground">{primary}</span>
              {category && (
                <>
                  <span className="text-muted-foreground/40">/</span>
                  <Link
                    href={categoryHref(blog)}
                    className="text-primary/90 transition-colors hover:text-primary"
                  >
                    {category}
                    {sub && ` / ${sub}`}
                  </Link>
                </>
              )}
            </p>
            <h1 className="mt-4 break-words text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
              {blog.title}
            </h1>
            {blog.description && (
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {blog.description}
              </p>
            )}
            <div className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 border-y border-border/60 py-3 text-sm text-muted-foreground">
              <time dateTime={blog.date} className="tabular-nums">
                {formatDate(blog.date)}
              </time>
              {blog.author && (
                <>
                  <Dot />
                  <span>{blog.author}</span>
                </>
              )}
              {blog.readingTime && (
                <>
                  <Dot />
                  <span>约 {blog.readingTime} 分钟</span>
                </>
              )}
              {isCollected(blog) && blog.source && (
                <>
                  <Dot />
                  <a
                    href={blog.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={blog.source}
                    className="underline decoration-border underline-offset-2 transition-colors hover:text-primary hover:decoration-primary/50"
                  >
                    来源：{hostnameOf(blog.source)}
                  </a>
                </>
              )}
              {tags.length > 0 && (
                <span className="flex flex-wrap gap-1.5 sm:ml-auto">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-muted/70 px-1.5 py-0.5 text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </span>
              )}
            </div>
          </header>
          <Prose className="mt-8" data-mdx-content>
            {children}
          </Prose>
        </article>

        {(prev || next) && (
          <nav
            aria-label="相邻文章"
            className="mt-16 grid gap-3 border-t border-border/60 pt-8 sm:grid-cols-2"
          >
            <SiblingLink blog={prev} direction="prev" />
            <SiblingLink blog={next} direction="next" />
          </nav>
        )}
      </div>
    </Container>
  )
}
