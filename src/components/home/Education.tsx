'use client'

import Image from 'next/image'
import { Student } from '@phosphor-icons/react'
import { EducationItemType, educationList } from '@/config/infoConfig'
import { CustomIcon } from '@/components/shared/CustomIcon'

function EducationItem({
  educationItem,
}: {
  educationItem: EducationItemType
}) {
  return (
    <li className="flex gap-4">
      <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center overflow-hidden rounded-full border border-muted bg-background shadow-md">
        {educationItem.image ? (
          <Image
            src={educationItem.image}
            alt={`${educationItem.school} logo`}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-primary/10">
            <span className="text-xs font-semibold">
              {educationItem.school.charAt(0)}
            </span>
          </div>
        )}
      </div>
      <div className="flex min-w-0 flex-auto flex-col">
        <div className="flex w-full min-w-0 items-center justify-between">
          <span className="truncate text-sm font-medium">
            {educationItem.website ? (
              <a
                href={educationItem.website}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary hover:underline"
              >
                {educationItem.school}
              </a>
            ) : (
              educationItem.school
            )}
          </span>
          <span className="ml-4 whitespace-nowrap text-xs text-muted-foreground">
            {educationItem.start} - {educationItem.end}
          </span>
        </div>
        <div className="mt-1 truncate text-xs text-muted-foreground">
          {educationItem.major}
        </div>
      </div>
    </li>
  )
}

export default function Education() {
  return (
    <div className="rounded-2xl border border-muted p-6 shadow-sm">
      <h2 className="flex text-sm font-semibold">
        <Student size={24} weight="duotone" />
        <span className="ml-3">教育经历</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {educationList.map((educationItem, educationItemIndex) => (
          <EducationItem
            key={educationItemIndex}
            educationItem={educationItem}
          />
        ))}
      </ol>
    </div>
  )
}
