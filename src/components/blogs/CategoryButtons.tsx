'use client'

import { type BlogType } from '@/lib/blogs'
import { useState } from 'react'

type Category = '全部' | '会计' | '金融&经济' | '技术' | '其他'

interface CategoryButtonsProps {
  blogs: BlogType[]
  onCategoryChange: (blogs: BlogType[], category: Category) => void
}

export function CategoryButtons({
  blogs,
  onCategoryChange,
}: CategoryButtonsProps) {
  const [activeCategory, setActiveCategory] = useState<Category>('全部')

  const filterBlogsByCategory = (category: Category) => {
    setActiveCategory(category)

    if (category === '全部') {
      onCategoryChange(blogs, category)
      return
    }

    const filteredBlogs = blogs.filter((blog) => {
      const tags = blog.tags || []

      switch (category) {
        case '会计':
          return tags.includes('会计')
        case '金融&经济':
          return tags.includes('金融') || tags.includes('经济')
        case '技术':
          return tags.includes('技术')
        case '其他':
          return (
            !tags.includes('会计') &&
            !tags.includes('金融') &&
            !tags.includes('经济') &&
            !tags.includes('技术')
          )
        default:
          return true
      }
    })

    onCategoryChange(filteredBlogs, category)
  }

  const categories: Category[] = ['全部', '会计', '金融&经济', '技术', '其他']

  return (
    <div className="mb-8 flex flex-wrap gap-4">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => filterBlogsByCategory(category)}
          className={`rounded-full border px-4 py-1 text-sm transition-all duration-300 ease-in-out ${
            activeCategory === category
              ? 'transform-none bg-primary text-primary-foreground shadow-none'
              : 'bg-background text-foreground shadow-none hover:-translate-x-0.5 hover:-translate-y-1 hover:transform hover:bg-muted hover:shadow-[2px_5px_0_0_black] active:translate-x-0.5 active:translate-y-0.5 active:transform active:shadow-none dark:hover:shadow-[2px_5px_0_0_white]'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  )
}
