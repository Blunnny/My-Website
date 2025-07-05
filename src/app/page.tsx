import { Container } from '@/components/layout/Container'
import Newsletter from '@/components/home/Newsletter'
import Career from '@/components/home/Career'
import Education from '@/components/home/Education'
import SocialLinks from '@/components/home/SocialLinks'
import RandomLyric from '@/components/home/RandomLyric'
import { headline, introduction } from '@/config/infoConfig'
import { BlogCard } from '@/components/home/BlogCard'
import { getAllBlogs, type BlogType } from '@/lib/blogs'
import { ProjectCard } from '@/components/project/ProjectCard'
import { ActivityCard } from '@/components/home/ActivityCard'
import {
  projectHeadLine,
  projectIntro,
  projects,
  blogHeadLine,
  blogIntro,
  techIcons,
} from '@/config/infoConfig'
import {
  awards,
  awardsHeadLine,
  awardsIntro,
  activities,
  activitiesHeadLine,
  activitiesIntro,
} from '@/config/projects'
import IconCloud from '@/components/ui/icon-cloud'
import { Award, Briefcase, Heart } from 'lucide-react'
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
        {/* personal info */}
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

        {/* Awards */}
        {/* <div className="mx-auto flex flex-col max-w-xl gap-6 lg:max-w-none my-4 py-8 border-t border-muted">
          <h2 className="flex flex-row items-center justify-start gap-2 text-xl font-semibold tracking-tight md:text-3xl opacity-80 mb-4">
            <Award size={28}/>
            {awardsHeadLine}
          </h2>
          <ul
            role="list"
            className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 md:grid-cols-3"
          >
            {awards.map((award) => (
              <ActivityCard key={award.name} activity={award} titleAs='h3'/>
            ))}
          </ul>
        </div> */}

        {/* Research & Projects */}
        <div className="mx-auto my-4 flex max-w-xl flex-col gap-6 border-t border-muted py-8 lg:max-w-none">
          <h2 className="mb-4 flex flex-row items-center justify-start gap-2 text-xl font-semibold tracking-tight opacity-80 md:text-3xl">
            <Link href="/projects" scroll={false}>
              <span
                className="project-animated-title text-xl font-semibold text-black dark:text-white md:text-3xl"
                style={{
                  position: 'relative',
                  display: 'inline-block',
                  color: 'inherit',
                  WebkitTextStroke: 'unset',
                }}
              >
                {'　' + projectHeadLine + '　'}
                <span className="hover-text" aria-hidden="true">
                  {'　' + projectHeadLine + '　'}
                </span>
              </span>
            </Link>
          </h2>
          <p className="mb-8 max-w-2xl text-base text-muted-foreground">
            {projectIntro}
          </p>
          <ul
            role="list"
            className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 md:grid-cols-3"
          >
            {projects.my.map((project) => (
              <ProjectCard key={project.name} project={project} titleAs="h3" />
            ))}
          </ul>
        </div>

        {/* Hobbies & Volunteer */}
        <div className="mx-auto my-4 flex max-w-xl flex-col gap-6 border-t border-muted py-8 lg:max-w-none">
          <h2 className="mb-4 flex flex-row items-center justify-start gap-2 text-xl font-semibold tracking-tight opacity-80 md:text-3xl">
            <Link href="/about" scroll={false}>
              <span
                className="project-animated-title text-xl font-semibold text-black dark:text-white md:text-3xl"
                style={{
                  position: 'relative',
                  display: 'inline-block',
                  color: 'inherit',
                  WebkitTextStroke: 'unset',
                }}
              >
                {'　' + activitiesHeadLine + '　'}
                <span className="hover-text" aria-hidden="true">
                  {'　' + activitiesHeadLine + '　'}
                </span>
              </span>
            </Link>
          </h2>
          <p className="mb-8 max-w-2xl text-base text-muted-foreground">
            {activitiesIntro}
          </p>
          <ul
            role="list"
            className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 md:grid-cols-3"
          >
            {activities.map((activity) => (
              <ActivityCard
                key={activity.name}
                activity={activity}
                titleAs="h3"
              />
            ))}
          </ul>
        </div>

        {/* Blog Section */}
        <div className="mx-auto my-8 flex max-w-xl flex-col gap-6 border-t border-muted py-8 lg:max-w-none">
          <h2 className="mb-4 flex flex-row items-center justify-start gap-2 text-xl font-semibold tracking-tight opacity-80 md:text-3xl">
            <Link href="/blogs" scroll={false}>
              <span
                className="project-animated-title text-xl font-semibold text-black dark:text-white md:text-3xl"
                style={{
                  position: 'relative',
                  display: 'inline-block',
                  color: 'inherit',
                  WebkitTextStroke: 'unset',
                }}
              >
                {'　' + blogHeadLine + '　'}
                <span className="hover-text" aria-hidden="true">
                  {'　' + blogHeadLine + '　'}
                </span>
              </span>
            </Link>
          </h2>
          <p className="mb-8 max-w-2xl text-base text-muted-foreground">
            {blogIntro}
          </p>
        </div>
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          {/* left column */}
          {/* blog */}
          <div className="flex flex-col gap-16">
            {blogList.map((blog: BlogType) => (
              <BlogCard key={blog.slug} blog={blog} titleAs="h3" />
            ))}
          </div>

          {/* right column */}
          <div className="space-y-10 lg:pl-16 xl:pl-24">
            <Education />
            <Career />
          </div>
        </div>
      </Container>
    </>
  )
}
