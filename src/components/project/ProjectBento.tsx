import { ProjectItemType } from '@/config/infoConfig'
import { cn } from '@/lib/utils'
import { ProjectCard } from './ProjectCard'

// 首张为 2×2 大卡；末张按剩余格数自动拉宽，避免网格末行留空
export function ProjectBento({
  projects,
  titleAs,
}: {
  projects: ProjectItemType[]
  titleAs?: keyof JSX.IntrinsicElements
}) {
  const count = projects.length
  const lgRemainder = (count + 3) % 3
  const smRemainder = (count - 1) % 2

  const lastClassName = cn(
    smRemainder === 1 && 'sm:col-span-2',
    lgRemainder === 0 && smRemainder === 1 && 'lg:col-span-1',
    lgRemainder === 1 && 'lg:col-span-3',
    lgRemainder === 2 && 'lg:col-span-2',
  )

  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5"
    >
      {projects.map((project, index) => {
        if (index === 0) {
          return (
            <ProjectCard
              key={project.name}
              project={project}
              titleAs={titleAs}
              variant="featured"
              className="sm:col-span-2 lg:row-span-2"
            />
          )
        }
        const isLast = index === count - 1
        return (
          <ProjectCard
            key={project.name}
            project={project}
            titleAs={titleAs}
            wide={isLast && lgRemainder !== 0}
            className={isLast ? lastClassName : undefined}
          />
        )
      })}
    </ul>
  )
}
