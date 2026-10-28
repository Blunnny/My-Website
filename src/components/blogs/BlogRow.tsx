import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { type BlogType } from '@/lib/blogs'
import {
  categoryPath,
  displayTags,
  formatDateDot,
  isCollected,
} from '@/lib/blogCategories'

function hostnameOf(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}

function Dot() {
  return <span className="text-muted-foreground/40">·</span>
}

export function BlogRow({
  blog,
  onNavigate,
}: {
  blog: BlogType
  onNavigate?: () => void
}) {
  const { category, sub } = categoryPath(blog)
  const tags = displayTags(blog)
  const collected = isCollected(blog)

  return (
    <li className="group relative px-5 py-5 transition-colors duration-200 hover:bg-muted/40 sm:px-6">
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 pr-6 text-xs text-muted-foreground">
        <time dateTime={blog.date} className="tabular-nums">
          {formatDateDot(blog.date)}
        </time>
        {category && (
          <>
            <Dot />
            <span className="text-primary/80">
              {category}
              {sub && ` / ${sub}`}
            </span>
          </>
        )}
        {blog.readingTime && (
          <>
            <Dot />
            <span>约 {blog.readingTime} 分钟</span>
          </>
        )}
      </div>

      <h2 className="mt-2 text-base font-semibold leading-snug tracking-tight text-foreground transition-colors duration-200 group-hover:text-primary sm:text-lg">
        <Link
          href={`/blogs/${blog.slug}`}
          onClick={onNavigate}
          className="before:absolute before:inset-0 before:content-['']"
        >
          {blog.title}
        </Link>
      </h2>

      {blog.description && (
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
          {blog.description}
        </p>
      )}

      {(tags.length > 0 || collected) && (
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-muted-foreground">
          {collected && (
            <span>作者：{blog.author || '佚名'}</span>
          )}
          {collected && blog.source && (
            <span>
              来源：
              <a
                href={blog.source}
                target="_blank"
                rel="noopener noreferrer"
                title={blog.source}
                className="relative z-10 underline decoration-border underline-offset-2 transition-colors hover:text-primary hover:decoration-primary/50"
              >
                {hostnameOf(blog.source)}
              </a>
            </span>
          )}
          {tags.length > 0 && (
            <span className="flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-muted/70 px-1.5 py-0.5 text-[11px]"
                >
                  #{tag}
                </span>
              ))}
            </span>
          )}
        </div>
      )}

      <ArrowRight
        aria-hidden
        className="absolute right-5 top-5 h-4 w-4 text-primary opacity-0 transition-all duration-200 group-hover:opacity-100 motion-safe:-translate-x-1 motion-safe:group-hover:translate-x-0 sm:right-6"
      />
    </li>
  )
}

export function BlogRows({
  blogs,
  onNavigate,
  listKey,
}: {
  blogs: BlogType[]
  onNavigate?: () => void
  listKey?: string
}) {
  return (
    <ul
      key={listKey}
      role="list"
      className="divide-y divide-border/60 overflow-hidden rounded-2xl border border-border/70 bg-card/50 motion-safe:duration-300 motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-1"
    >
      {blogs.map((blog) => (
        <BlogRow key={blog.slug} blog={blog} onNavigate={onNavigate} />
      ))}
    </ul>
  )
}
