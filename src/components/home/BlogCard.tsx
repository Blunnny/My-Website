import { Card } from '@/components/shared/Card'
import { type BlogType } from '@/lib/blogs'
import { categoryPath, formatDateDot } from '@/lib/blogCategories'

export function BlogCard({ blog, titleAs }: { blog: BlogType, titleAs?: keyof JSX.IntrinsicElements }) {
  const as = titleAs ?? 'h2'
  const { category, sub } = categoryPath(blog)
  return (
    <Card as="article">
      <Card.Title as={as} href={`/blogs/${blog.slug}`}>
        {blog.title}
      </Card.Title>
      <Card.Eyebrow as="div" decorate className="gap-2 text-xs">
        <time dateTime={blog.date} className="tabular-nums">
          {formatDateDot(blog.date)}
        </time>
        {category && (
          <>
            <span className="text-muted-foreground/40">·</span>
            <span className="text-primary/80">
              {category}
              {sub && ` / ${sub}`}
            </span>
          </>
        )}
        {blog.readingTime && (
          <>
            <span className="text-muted-foreground/40">·</span>
            <span>约 {blog.readingTime} 分钟</span>
          </>
        )}
      </Card.Eyebrow>
      <Card.Description>{blog.description}</Card.Description>
      <Card.Cta>Read blog</Card.Cta>
    </Card>
  )
}
