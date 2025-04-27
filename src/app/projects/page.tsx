import { type Metadata } from 'next'
import { SimpleLayout } from '@/components/layout/SimpleLayout'
import {
  projectHeadLine,
  projectIntro,
  projects,
  watchingProjectHeadLine,
  watchingProjectIntro,
  watchingProjects,
} from '@/config/projects'
import { ProjectCard } from '@/components/project/ProjectCard'

export const metadata: Metadata = {
  title: 'Projects',
  description: projectHeadLine,
}

export default function Projects() {
  return (
    <SimpleLayout title={projectHeadLine} intro={projectIntro}>
      <ul
        role="list"
        className="grid grid-cols-1 gap-x-8 gap-y-12 pb-10 sm:grid-cols-2 lg:grid-cols-3"
      >
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </ul>

      <div className="mt-16">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-3xl">
          {watchingProjectHeadLine}
        </h2>
        <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
          {watchingProjectIntro}
        </p>
        <ul
          role="list"
          className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
        >
          {watchingProjects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </ul>
      </div>
    </SimpleLayout>
  )
}
