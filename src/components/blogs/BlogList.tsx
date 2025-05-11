'use client'

import { useState } from 'react'
import { type BlogType } from '@/lib/blogs'
import { CategoryButtons } from './CategoryButtons'
import { Card } from '@/components/shared/Card'
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

interface BlogListProps {
  initialBlogs: BlogType[]
}

export function BlogList({ initialBlogs }: BlogListProps) {
  const [blogs, setBlogs] = useState(initialBlogs)
  const blogsPerPage = 10
  const totalPages = Math.ceil(blogs.length / blogsPerPage)
  const currentPage = 1 // 默认第一页
  const currentBlogs = blogs.slice(0, blogsPerPage)

  return (
    <>
      <CategoryButtons blogs={initialBlogs} onCategoryChange={setBlogs} />
      <div className="flex max-w-3xl flex-col space-y-16">
        {currentBlogs.map((blog: BlogType) => (
          <Blog key={blog.slug} blog={blog} />
        ))}
      </div>
    </>
  )
}
