import { type Metadata } from 'next'
import { notFound } from 'next/navigation'

import {
  getAllBlogs,
  getBlogBySlug,
  getAllBlogSlugs,
  type BlogType,
} from '@/lib/blogs'
import { isCollected } from '@/lib/blogCategories'
import { getMDXContent } from '@/lib/mdx'
import { BlogLayout } from '@/components/layout/BlogLayout'

export const runtime = process.env.NEXT_RUNTIME === 'edge' ? 'edge' : 'nodejs'

interface Props {
  params: {
    slug: string[]
  }
}

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs()
  return slugs.map((slug) => ({
    slug: slug.split('/'),
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = Array.isArray(params.slug) ? params.slug.join('/') : params.slug
  const blog = await getBlogBySlug(slug)
  if (!blog) {
    return {}
  }

  return {
    title: blog.title,
    description: blog.description,
  }
}

export default async function BlogPage({ params }: Props) {
  const slug = Array.isArray(params.slug) ? params.slug.join('/') : params.slug
  const blog = await getBlogBySlug(slug)

  if (!blog) {
    notFound()
  }

  const content = await getMDXContent(slug)

  // 与列表同序（新→旧），只在同一类型（原创 / 收藏）内导航
  const siblings = (await getAllBlogs()).filter(
    (item) => isCollected(item) === isCollected(blog),
  )
  const index = siblings.findIndex((item) => item.slug === blog.slug)
  const toLink = (item?: BlogType) =>
    item ? { slug: item.slug, title: item.title } : undefined

  return (
    <BlogLayout
      blog={blog}
      prev={toLink(siblings[index - 1])}
      next={toLink(siblings[index + 1])}
    >
      <div className="prose mt-8 dark:prose-invert">{content}</div>
    </BlogLayout>
  )
}
