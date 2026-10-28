'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from '@phosphor-icons/react'
import { ProjectItemType } from '@/config/infoConfig'
import { utm_source } from '@/config/siteConfig'
import { cn } from '@/lib/utils'
import { SpotlightCard } from './SpotlightCard'

type Variant = 'featured' | 'default' | 'compact'

function parseGithubRepo(href: string) {
  const clean = href.replace(/^https?:\/\//, '').split(/[?#]/)[0]
  const [host, owner, repo] = clean.split('/')
  if (host !== 'github.com' || !owner) return null
  return { owner, path: repo ? `${owner}/${repo}` : owner }
}

const iconSizes = {
  sm: 'h-9 w-9 rounded-lg',
  md: 'h-11 w-11 rounded-xl',
  lg: 'h-14 w-14 rounded-2xl sm:h-16 sm:w-16',
}

function ProjectIcon({
  project,
  owner,
  size,
}: {
  project: ProjectItemType
  owner?: string
  size: keyof typeof iconSizes
}) {
  const [failed, setFailed] = useState(false)
  const base = cn(
    'relative shrink-0 overflow-hidden bg-background ring-1 ring-border/60',
    iconSizes[size],
  )

  if (project.logo) {
    return (
      <div className={base}>
        <Image
          src={project.logo}
          alt={`${project.name} logo`}
          fill
          sizes="64px"
          className="object-cover"
        />
      </div>
    )
  }

  if (owner && !failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={`https://github.com/${owner}.png?size=80`}
        alt=""
        loading="lazy"
        onError={() => setFailed(true)}
        className={cn(base, 'object-cover')}
      />
    )
  }

  return (
    <div
      className={cn(
        base,
        'flex items-center justify-center bg-primary/10 text-sm font-semibold text-primary',
      )}
    >
      {project.name.charAt(0).toUpperCase()}
    </div>
  )
}

function TagList({ tags, className }: { tags: string[]; className?: string }) {
  if (!tags || tags.length === 0) return null
  return (
    <ul className={cn('flex flex-wrap gap-1.5', className)}>
      {tags.map((tag) => (
        <li
          key={tag}
          className="rounded-md border border-border/60 bg-muted/40 px-1.5 py-0.5 text-[11px] leading-4 text-muted-foreground"
        >
          {tag}
        </li>
      ))}
    </ul>
  )
}

function ArrowBadge({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'flex h-8 w-8 items-center justify-center rounded-full border border-border/60 bg-background/60 text-muted-foreground backdrop-blur-sm',
        'transition-[color,border-color,transform] duration-300',
        'group-hover/spot:border-primary/40 group-hover/spot:text-primary',
        'motion-safe:group-hover/spot:-translate-y-0.5 motion-safe:group-hover/spot:translate-x-0.5',
        className,
      )}
    >
      <ArrowUpRight size={14} weight="bold" />
    </span>
  )
}

export function ProjectCard({
  project,
  titleAs,
  variant = 'default',
  wide = false,
  className,
}: {
  project: ProjectItemType
  titleAs?: keyof JSX.IntrinsicElements
  variant?: Variant
  wide?: boolean
  className?: string
}) {
  const utmLink = `https://${project.link.href}?utm_source=${utm_source}`
  const Component = titleAs ?? 'h2'
  const repo = parseGithubRepo(project.link.href)

  const overlayLink = (
    <Link
      href={utmLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={project.name}
      className="absolute inset-0 z-20 rounded-[inherit] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
    />
  )

  if (variant === 'featured') {
    return (
      <li className={cn('h-full', className)}>
        <SpotlightCard className="h-full bg-gradient-to-br from-primary/[0.07] via-card/50 to-card/50">
          {project.logo && (
            <Image
              src={project.logo}
              alt=""
              aria-hidden="true"
              width={240}
              height={240}
              className="pointer-events-none absolute -bottom-12 -right-12 h-60 w-60 rotate-12 select-none rounded-[2.5rem] object-cover opacity-[0.07] blur-[2px]"
            />
          )}
          <div className="relative flex h-full flex-col p-6 sm:p-8">
            <ProjectIcon project={project} owner={repo?.owner} size="lg" />
            <Component className="mt-6 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {project.name}
            </Component>
            <p className="mt-3 max-w-md text-base leading-relaxed text-muted-foreground">
              {project.description}
            </p>
            <div className="mt-auto pt-8">
              <TagList tags={project.tags} />
              {repo && (
                <p className="mt-4 font-mono text-xs text-muted-foreground/80">
                  {project.link.label} · {repo.path}
                </p>
              )}
            </div>
          </div>
          <ArrowBadge className="absolute right-6 top-6 h-9 w-9" />
          {overlayLink}
        </SpotlightCard>
      </li>
    )
  }

  if (variant === 'compact') {
    return (
      <li className={cn('h-full', className)}>
        <SpotlightCard className="h-full rounded-xl">
          <div className="relative flex h-full flex-col p-4">
            <div className="flex items-center gap-3 pr-10">
              <ProjectIcon project={project} owner={repo?.owner} size="sm" />
              <div className="min-w-0">
                <Component className="break-words text-sm font-semibold leading-snug tracking-tight text-foreground">
                  {project.name}
                </Component>
                {repo && (
                  <p className="truncate font-mono text-[11px] text-muted-foreground/80">
                    {repo.path}
                  </p>
                )}
              </div>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {project.description}
            </p>
            <TagList tags={project.tags} className="mt-auto pt-4" />
          </div>
          <ArrowBadge className="absolute right-3 top-3 h-7 w-7" />
          {overlayLink}
        </SpotlightCard>
      </li>
    )
  }

  return (
    <li className={cn('h-full', className)}>
      <SpotlightCard className="h-full">
        <div
          className={cn(
            'relative flex h-full flex-col p-5',
            wide && 'lg:flex-row lg:items-center lg:gap-6 lg:pr-16',
          )}
        >
          <ProjectIcon project={project} owner={repo?.owner} size="md" />
          <div className={cn('mt-4 pr-8', wide && 'lg:mt-0 lg:flex-1 lg:pr-0')}>
            <Component className="text-base font-semibold tracking-tight text-foreground">
              {project.name}
            </Component>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              {project.description}
            </p>
          </div>
          <TagList
            tags={project.tags}
            className={cn(
              'mt-auto pt-5',
              wide && 'lg:mt-0 lg:max-w-xs lg:justify-end lg:pt-0',
            )}
          />
        </div>
        <ArrowBadge className="absolute right-5 top-5" />
        {overlayLink}
      </SpotlightCard>
    </li>
  )
}
