'use client'

import { useState, Suspense } from 'react'
import { type BlogType } from '@/lib/blogs'
import { CategoryButtons } from './CategoryButtons'
import { Card } from '@/components/shared/Card'
import { formatDate } from '@/lib/formatDate'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

function Blog({ blog, showSource }: { blog: BlogType; showSource?: boolean }) {
  // 点击博客链接时保存滚动位置
  const handleBlogClick = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(
        'blogListScrollPosition',
        window.scrollY.toString(),
      )
    }
  }

  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3" onClick={handleBlogClick}>
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
        {showSource && (
          <div className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            <div>作者：{blog.author || '佚名'}</div>
            {blog.source && (
              <div>
                来源：
                <a
                  href={blog.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  {blog.source}
                </a>
              </div>
            )}
          </div>
        )}
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

interface BlogListProps {
  initialBlogs: BlogType[]
}

function BlogListContent({ initialBlogs }: BlogListProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [blogs, setBlogs] = useState(initialBlogs)

  // 从 URL 参数中读取当前分类状态
  const urlCategory = searchParams.get('category') || '全部'
  const [currentCategory, setCurrentCategory] = useState(urlCategory)

  const blogsPerPage = 10
  const totalPages = Math.ceil(blogs.length / blogsPerPage)
  const currentPage = Number(searchParams.get('page')) || 1
  const startIndex = (currentPage - 1) * blogsPerPage
  const currentBlogs = blogs.slice(startIndex, startIndex + blogsPerPage)

  // 保存滚动位置并跳转到指定页面
  const handlePageChange = (page: number) => {
    // 保存当前滚动位置
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(
        'blogListScrollPosition',
        window.scrollY.toString(),
      )
    }

    const params = new URLSearchParams(searchParams.toString())
    params.set('page', page.toString())
    router.push(`/blogs?${params.toString()}`)
  }

  return (
    <>
      <CategoryButtons
        blogs={initialBlogs}
        onCategoryChange={(filteredBlogs, category) => {
          setBlogs(filteredBlogs)
          setCurrentCategory(category)
        }}
      />
      <div className="flex max-w-3xl flex-col space-y-16">
        {currentBlogs.map((blog: BlogType) => (
          <Blog
            key={blog.slug}
            blog={blog}
            showSource={currentCategory === '好文转载'}
          />
        ))}
      </div>
      {/* 分页导航 */}
      <div className="mt-16 flex justify-center space-x-4">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`rounded-md px-4 py-2 ${
              page === currentPage
                ? 'bg-primary text-primary-foreground'
                : 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700'
            }`}
          >
            {page}
          </button>
        ))}
      </div>
    </>
  )
}

export function BlogList(props: BlogListProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BlogListContent {...props} />
    </Suspense>
  )
}
