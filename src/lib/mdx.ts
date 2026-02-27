import { compileMDX } from 'next-mdx-remote/rsc'
import { promises as fs } from 'fs'
import { mdxComponents } from '@/components/shared/MdxComponents'
import { resolveBlogFilePathBySlug } from '@/lib/blogs'
import remarkMath from 'remark-math'
import remarkGfm from 'remark-gfm'
import rehypeKatex from 'rehype-katex'

export async function getMDXContent(slug: string) {
  const filePath = await resolveBlogFilePathBySlug(slug)

  if (!filePath) {
    throw new Error(`MDX content not found for slug: ${slug}`)
  }

  const source = await fs.readFile(filePath, 'utf-8')

  const { content } = await compileMDX({
    source,
    components: mdxComponents,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkMath, remarkGfm],
        rehypePlugins: [rehypeKatex],
      },
    },
  })

  return content
}
