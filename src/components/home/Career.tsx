'use client'

import Image from 'next/image'
import { Briefcase } from '@phosphor-icons/react'
import { CareerItemType, careerList } from '@/config/infoConfig'
import { CustomIcon } from '@/components/shared/CustomIcon'

function CareerItem({ careerItem }: { careerItem: CareerItemType }) {
  return (
    <li className="group flex gap-4 rounded-lg p-2 transition-all duration-200 hover:scale-[1.01] hover:bg-muted/50 dark:hover:bg-white/10">
      <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center overflow-hidden rounded-full border border-muted bg-background shadow-md">
        {careerItem.image ? (
          <Image
            src={careerItem.image}
            alt={`${careerItem.company} logo`}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-primary/10">
            <span className="text-xs font-semibold">
              {careerItem.company.charAt(0)}
            </span>
          </div>
        )}
      </div>
      <div className="flex min-w-0 flex-auto flex-col">
        <div className="flex w-full min-w-0 items-center justify-between">
          <span className="truncate text-sm font-medium">
            {careerItem.website ? (
              <a
                href={careerItem.website}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary hover:underline"
              >
                {careerItem.company}
              </a>
            ) : (
              careerItem.company
            )}
          </span>
          <span className="ml-4 whitespace-nowrap text-xs text-muted-foreground">
            {careerItem.start} - {careerItem.end}
          </span>
        </div>
        <div className="mt-1 truncate text-xs text-muted-foreground">
          {careerItem.title}
        </div>
      </div>
    </li>
  )
}

export default function Career() {
  return (
    <div className="rounded-2xl border border-muted p-6 shadow-sm">
      <h2 className="flex text-sm font-semibold">
        <Briefcase size={24} weight="duotone" />
        <span className="ml-3">实习经历</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {careerList.map((careerItem, careerItemIndex) => (
          <CareerItem key={careerItemIndex} careerItem={careerItem} />
        ))}
      </ol>
    </div>
  )
}
