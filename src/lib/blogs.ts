import glob from 'fast-glob'
import { promises as fs } from 'fs'
import path from 'path'
import matter from 'gray-matter'

export type BlogType = {
  title: string
  description: string
  author: string
  date: string
  slug: string
  tags?: string[]
  content: string
  source?: string
}

async function importBlog(blogFilename: string): Promise<BlogType> {
  const source = await fs.readFile(
    path.join(process.cwd(), 'src/content/blog', blogFilename),
    'utf-8',
  )

  const { data } = matter(source)

  // @ts-expect-error
  return {
    slug: blogFilename.replace(/\\/g, '/').replace(/\.mdx$/, ''),
    ...data,
  }
}

export async function getAllBlogs() {
  let blogFileNames = await glob('**/*.mdx', {
    cwd: './src/content/blog',
  })

  let blogs = await Promise.all(blogFileNames.map(importBlog))

  return blogs.sort((a, z) => {
    const aDate = a.date ? +new Date(a.date) : 0
    const zDate = z.date ? +new Date(z.date) : 0
    return zDate - aDate
  })
}

export async function getBlogBySlug(slug: string): Promise<BlogType | null> {
  try {
    // 移除双重解码，因为 slug 在页面组件中已经被正确解码
    const cleanSlug = slug.replace(/\.mdx$/, '')
    return await importBlog(`${cleanSlug}.mdx`)
  } catch (error) {
    console.error(`Failed to load blog with slug: ${slug}`, error)
    return null
  }
}
