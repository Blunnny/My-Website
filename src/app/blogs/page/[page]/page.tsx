import { Container } from '@/components/layout/Container'
import { BlogHeader } from '@/components/blogs/BlogHeader'
import { BlogRows } from '@/components/blogs/BlogRow'
import { Pagination } from '@/components/blogs/Pagination'
import { getAllBlogs } from '@/lib/blogs'

const BLOGS_PER_PAGE = 10

export async function generateStaticParams() {
  const blogs = await getAllBlogs()
  const totalPages = Math.ceil(blogs.length / BLOGS_PER_PAGE)

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
  const totalPages = Math.ceil(blogs.length / BLOGS_PER_PAGE)
  const currentPage = parseInt(params.page)
  const startIndex = (currentPage - 1) * BLOGS_PER_PAGE
  const currentBlogs = blogs.slice(startIndex, startIndex + BLOGS_PER_PAGE)

  return (
    <Container className="mt-16 sm:mt-28">
      <div className="mx-auto max-w-2xl lg:max-w-4xl">
        <BlogHeader />
        <BlogRows blogs={currentBlogs} />
        <Pagination
          current={currentPage}
          total={totalPages}
          hrefFor={(page) => (page === 1 ? '/blogs' : `/blogs/page/${page}`)}
        />
      </div>
    </Container>
  )
}
