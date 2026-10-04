import { Container } from '@/components/layout/Container'
import Career from '@/components/home/Career'
import Education from '@/components/home/Education'
import SocialLinks from '@/components/home/SocialLinks'
import RandomLyric from '@/components/home/RandomLyric'
import { headline, introduction } from '@/config/infoConfig'
import { BlogCard } from '@/components/home/BlogCard'
import { getAllBlogs, type BlogType } from '@/lib/blogs'
import { ProjectCard } from '@/components/project/ProjectCard'
import {
  projectHeadLine,
  projectIntro,
  projects,
  blogHeadLine,
  blogIntro,
  techIcons,
} from '@/config/infoConfig'
import IconCloud from '@/components/ui/icon-cloud'
import Link from 'next/link'

export default async function Home() {
  // 获取所有博客并过滤掉"好文转载"的文章，然后取前4篇
  let allBlogs = await getAllBlogs()
  let blogList = allBlogs
    .filter((blog) => {
      const tags = blog.tags || []
      return !tags.includes('好文转载')
    })
    .slice(0, 4)

  return (
    <>
      <Container className="mt-9">
        {/* personal info — 恢复原先双栏布局 */}
        <div className="mb-10 grid grid-cols-1 md:grid-cols-2">
          <div className="md:mt-20">
            <h2 className="text-2xl font-semibold tracking-tight opacity-80 sm:text-3xl">
              {headline}
            </h2>
            <p className="mt-6 text-xl text-muted-foreground">{introduction}</p>
            <div className="mt-6 flex flex-row items-center gap-2">
              <SocialLinks className="mt-0" />
            </div>
            <div className="my-12" />
            <RandomLyric />
          </div>
          <div className="relative ml-auto flex size-full w-full items-center justify-center overflow-hidden px-20 md:mr-8 md:w-2/3 md:px-0">
            <IconCloud iconSlugs={techIcons} />
          </div>
        </div>

        {/* Projects */}
        <section className="mx-auto max-w-xl border-t border-muted py-12 lg:max-w-none lg:py-16">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="section-kicker">Projects</p>
              <h2 className="section-title mt-3">
                <Link
                  href="/projects"
                  scroll={false}
                  className="transition-colors duration-200 hover:text-primary"
                >
                  {projectHeadLine}
                </Link>
              </h2>
              <p className="section-lead mt-3">{projectIntro}</p>
            </div>
            <Link
              href="/projects"
              scroll={false}
              className="text-sm text-muted-foreground transition-colors duration-200 hover:text-primary"
            >
              查看全部 →
            </Link>
          </div>
          <ul
            role="list"
            className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 md:grid-cols-3"
          >
            {projects.my.map((project) => (
              <ProjectCard key={project.name} project={project} titleAs="h3" />
            ))}
          </ul>
        </section>

        {/* Blog + timeline */}
        <section className="mx-auto max-w-xl border-t border-muted py-12 lg:max-w-none lg:py-16">
          <div className="mb-10">
            <p className="section-kicker">Writing</p>
            <h2 className="section-title mt-3">
              <Link
                href="/blogs"
                scroll={false}
                className="transition-colors duration-200 hover:text-primary"
              >
                {blogHeadLine}
              </Link>
            </h2>
            <p className="section-lead mt-3">{blogIntro}</p>
          </div>
          <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:gap-x-16">
            <div className="flex flex-col gap-12">
              {blogList.map((blog: BlogType) => (
                <BlogCard key={blog.slug} blog={blog} titleAs="h3" />
              ))}
            </div>
            <div className="space-y-10 lg:pl-4">
              <Education />
              <Career />
            </div>
          </div>
        </section>
      </Container>
    </>
  )
}
