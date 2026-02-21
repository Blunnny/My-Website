import { type Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getBlogBySlug, getAllBlogSlugs } from '@/lib/blogs'
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
    slug: slug.split('/').map(encodeURIComponent),
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = Array.isArray(params.slug)
    ? params.slug.map(decodeURIComponent).join('/')
    : decodeURIComponent(params.slug)
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
  const slug = Array.isArray(params.slug)
    ? params.slug.map(decodeURIComponent).join('/')
    : decodeURIComponent(params.slug)
  const blog = await getBlogBySlug(slug)

  if (!blog) {
    notFound()
  }

  const content = await getMDXContent(slug)

  return (
    <BlogLayout blog={blog}>
      <div className="prose dark:prose-invert mt-8">{content}</div>
    </BlogLayout>
  )
}
