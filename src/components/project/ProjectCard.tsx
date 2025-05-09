'use client'

import { ArrowRightIcon, HashIcon } from 'lucide-react'
import Image from 'next/image'
import { ArrowUpRight } from '@phosphor-icons/react'
import { ProjectItemType } from '@/config/infoConfig'
import { utm_source } from '@/config/siteConfig'
import Link from 'next/link'
import { Favicon } from 'favicon-stealer'

export function ProjectCard({
  project,
  titleAs,
}: {
  project: ProjectItemType
  titleAs?: keyof JSX.IntrinsicElements
}) {
  const utmLink = `https://${project.link.href}?utm_source=${utm_source}`
  let Component = titleAs ?? 'h2'
  // 获取 favicon 的 url
  const getFavicon = () => {
    try {
      const url = new URL(
        project.link.href.startsWith('http')
          ? project.link.href
          : `https://${project.link.href}`,
      )
      return `https://www.google.com/s2/favicons?sz=64&domain_url=${url.origin}`
    } catch {
      return ''
    }
  }
  return (
    <li className="group relative flex h-full flex-col items-start">
      <div className="relative flex h-full w-full flex-col justify-between rounded-2xl border border-muted-foreground/20 p-4 shadow-sm transition-all group-hover:scale-[1.03] group-hover:bg-muted/5 group-hover:shadow-md">
        <div className="">
          {project.logo ? (
            <div className="flex flex-col items-start justify-center gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-2">
                  <Component className="text-base font-semibold">
                    {project.name}
                  </Component>
                  <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-background">
                    <Image
                      src={project.logo}
                      alt={`${project.name} logo`}
                      width={32}
                      height={32}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {project.description}
                </p>
              </div>
            </div>
          ) : (
            <div className="ml-2 flex flex-col items-start">
              <Component className="text-base font-semibold">
                {project.name}
              </Component>
              <p className="mt-2 text-sm text-muted-foreground">
                {project.description}
              </p>
            </div>
          )}
        </div>

        <div className="relative z-10 ml-1 mt-auto pt-4">
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-x-2">
              {project.tags.map((tag, index) => (
                <div
                  key={index}
                  className="group flex items-center justify-center space-x-0.5"
                >
                  <HashIcon className="icon-scale h-3 w-3 text-muted-foreground" />
                  <span className="text-xs tracking-tighter text-muted-foreground">
                    {tag}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
        <Link
          href={utmLink}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 z-20"
        >
          <ArrowUpRight
            size={32}
            weight="duotone"
            className="absolute right-4 top-4 h-4 w-4 group-hover:cursor-pointer group-hover:text-primary"
          />
        </Link>
      </div>
    </li>
  )
}
