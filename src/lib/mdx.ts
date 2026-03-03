import { compileMDX } from 'next-mdx-remote/rsc'
import { promises as fs } from 'fs'
import { mdxComponents } from '@/components/shared/MdxComponents'
import { resolveBlogFilePathBySlug } from '@/lib/blogs'
import remarkMath from 'remark-math'
import remarkGfm from 'remark-gfm'
import rehypeKatex from 'rehype-katex'
// @ts-ignore 缺少类型声明文件
import rehypePrism from '@mapbox/rehype-prism'
import { visit } from 'unist-util-visit'

// Custom plugin to pass 'title' metadata from code block to pre element
function rehypeCodeTitles() {
  return (tree: any) => {
    visit(tree, 'element', (node) => {
      // Check if it's a 'pre' element that contains a 'code' element
      if (node.tagName === 'pre' && node.children && node.children.length > 0) {
        const codeNode = node.children[0]
        if (
          codeNode.tagName === 'code' &&
          codeNode.data &&
          codeNode.data.meta
        ) {
          const meta = codeNode.data.meta as string
          // Extract title="Title" or title='Title' or just title:Title
          const titleMatch =
            meta.match(/title="([^"]+)"/) || meta.match(/title='([^']+)'/)
          if (titleMatch) {
            node.properties = node.properties || {}
            node.properties.title = titleMatch[1]
          }
        }
      }
    })
  }
}

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
        rehypePlugins: [rehypeCodeTitles, rehypeKatex, rehypePrism],
      },
    },
  })

  return content
}
