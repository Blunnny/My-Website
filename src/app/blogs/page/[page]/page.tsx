import { type Metadata } from 'next'
import { Card } from '@/components/shared/Card'
import { SimpleLayout } from '@/components/layout/SimpleLayout'
import { blogHeadLine, blogIntro } from '@/config/infoConfig'
import { getAllBlogs } from '@/lib/blogs'
import { type BlogType } from '@/lib/blogs'
import Link from 'next/link'
import { formatDate } from '@/lib/formatDate'

function Blog({ blog }: { blog: BlogType }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/blogs/${blog.slug}`}>{blog.title}</Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={blog.date}
          className="md:hidden"
          decorate
        >
          {formatDate(blog.date)}
        </Card.Eyebrow>
        <Card.Description>{blog.description}</Card.Description>
        <Card.Cta>Read blog</Card.Cta>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={blog.date}
        className="mt-1 hidden md:block"
      >
        {formatDate(blog.date)}
      </Card.Eyebrow>
    </article>
  )
}

// 添加generateStaticParams函数
export async function generateStaticParams() {
  const blogs = await getAllBlogs()
  const blogsPerPage = 10
  const totalPages = Math.ceil(blogs.length / blogsPerPage)

  // 生成所有分页的参数
  return Array.from({ length: totalPages }, (_, i) => ({
    page: (i + 1).toString(),
  }))
}

export default async function BlogsPage({
  params,
}: {
  params: { page: string }
}) {
  const blogs = await getAllBlogs()
  const blogsPerPage = 10
  const totalPages = Math.ceil(blogs.length / blogsPerPage)
  const currentPage = parseInt(params.page)
  const startIndex = (currentPage - 1) * blogsPerPage
  const currentBlogs = blogs.slice(startIndex, startIndex + blogsPerPage)

  return (
    <SimpleLayout
      title={blogHeadLine}
      intro={
        <div className="space-y-6">
          <p>{blogIntro}</p>
        </div>
      }
    >
      <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <div className="flex max-w-3xl flex-col space-y-16">
          {currentBlogs.map((blog: BlogType) => (
            <Blog key={blog.slug} blog={blog} />
          ))}
        </div>
        {/* 分页导航 */}
        <div className="mt-16 flex justify-center space-x-4">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Link
              key={page}
              href={page === 1 ? '/blogs' : `/blogs/page/${page}`}
              className={`rounded-md px-4 py-2 ${
                page === currentPage
                  ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                  : 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700'
              }`}
            >
              {page}
            </Link>
          ))}
        </div>
      </div>
    </SimpleLayout>
  )
}
