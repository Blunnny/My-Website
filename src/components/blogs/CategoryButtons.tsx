'use client'

import { type BlogType } from '@/lib/blogs'
import { useState, useEffect } from 'react'

type Category = '全部' | '会计' | '金融&经济' | '技术' | '其他' | '好文转载'
type PrimaryCategory = '我的博客' | '文章收藏'

interface CategoryButtonsProps {
  blogs: BlogType[]
  onCategoryChange: (blogs: BlogType[], category: Category) => void
}

export function CategoryButtons({
  blogs,
  onCategoryChange,
}: CategoryButtonsProps) {
  const [activePrimaryCategory, setActivePrimaryCategory] =
    useState<PrimaryCategory>('我的博客')
  const [activeCategory, setActiveCategory] = useState<Category>('全部')

  // 修改 filterBlogsByCategory，增加 primaryCategory 参数，默认用 activePrimaryCategory
  const filterBlogsByCategory = (
    category: Category,
    primaryCategory: PrimaryCategory = activePrimaryCategory,
  ) => {
    setActiveCategory(category)

    if (category === '全部') {
      if (primaryCategory === '我的博客') {
        const filteredBlogs = blogs.filter((blog) => {
          const tags = blog.tags || []
          return !tags.includes('好文转载')
        })
        onCategoryChange(filteredBlogs, category)
      } else {
        onCategoryChange(blogs, category)
      }
      return
    }

    const filteredBlogs = blogs.filter((blog) => {
      const tags = blog.tags || []

      switch (category) {
        case '会计':
          return tags.includes('会计') && !tags.includes('好文转载')
        case '金融&经济':
          return (
            (tags.includes('金融') || tags.includes('经济')) &&
            !tags.includes('好文转载')
          )
        case '技术':
          return tags.includes('技术') && !tags.includes('好文转载')
        case '好文转载':
          return tags.includes('好文转载')
        case '其他':
          return (
            !tags.includes('会计') &&
            !tags.includes('金融') &&
            !tags.includes('经济') &&
            !tags.includes('技术') &&
            !tags.includes('好文转载')
          )
        default:
          return true
      }
    })

    onCategoryChange(filteredBlogs, category)
  }

  // 组件初始化时应用默认过滤
  useEffect(() => {
    // 初始化时，直接过滤掉"好文转载"的文章，因为默认是"我的博客"分类
    const filteredBlogs = blogs.filter((blog) => {
      const tags = blog.tags || []
      return !tags.includes('好文转载')
    })
    onCategoryChange(filteredBlogs, '全部')
  }, []) // 空依赖数组，只在组件挂载时执行一次

  // handlePrimaryCategoryChange 里传递目标主分类
  const handlePrimaryCategoryChange = (primaryCategory: PrimaryCategory) => {
    setActivePrimaryCategory(primaryCategory)

    if (primaryCategory === '文章收藏') {
      setActiveCategory('好文转载')
      filterBlogsByCategory('好文转载', '文章收藏')
    } else {
      setActiveCategory('全部')
      filterBlogsByCategory('全部', '我的博客')
    }
  }

  const primaryCategories: PrimaryCategory[] = ['我的博客', '文章收藏']

  const myBlogCategories: Category[] = [
    '全部',
    '会计',
    '金融&经济',
    '技术',
    '其他',
  ]
  const collectionCategories: Category[] = ['好文转载']

  const getSecondaryCategories = () => {
    return activePrimaryCategory === '我的博客'
      ? myBlogCategories
      : collectionCategories
  }

  return (
    <div className="mb-8 space-y-4">
      {/* 一级分类按钮 */}
      <div className="flex flex-wrap gap-4">
        {primaryCategories.map((primaryCategory) => (
          <button
            key={primaryCategory}
            onClick={() => handlePrimaryCategoryChange(primaryCategory)}
            className={`rounded-lg border px-6 py-2 text-base font-semibold transition-all duration-300 ease-in-out ${
              activePrimaryCategory === primaryCategory
                ? 'border-primary bg-primary text-primary-foreground shadow-lg'
                : 'border-zinc-300 bg-background text-foreground hover:border-primary hover:bg-muted hover:shadow-md dark:border-zinc-600'
            }`}
          >
            {primaryCategory}
          </button>
        ))}
      </div>

      {/* 二级分类按钮 */}
      <div className="flex flex-wrap gap-3 pl-4">
        {getSecondaryCategories().map((category) => (
          <button
            key={category}
            onClick={() => filterBlogsByCategory(category)}
            className={`rounded-full border px-4 py-1 text-sm transition-all duration-300 ease-in-out ${
              activeCategory === category
                ? 'transform-none bg-pink-400 text-white shadow-none'
                : 'bg-background text-foreground shadow-none hover:-translate-x-0.5 hover:-translate-y-1 hover:transform hover:bg-muted hover:shadow-[2px_5px_0_0_black] active:translate-x-0.5 active:translate-y-0.5 active:transform active:shadow-none dark:hover:shadow-[2px_5px_0_0_white]'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  )
}
