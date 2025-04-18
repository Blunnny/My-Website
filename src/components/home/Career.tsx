'use client'

import Image from 'next/image'
import { Briefcase } from '@phosphor-icons/react'
import { CareerItemType, careerList } from '@/config/infoConfig'
import { CustomIcon } from '@/components/shared/CustomIcon'

function CareerItem({ careerItem }: { careerItem: CareerItemType }) {
  return (
    <li className="flex gap-4">
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
      <dl className="flex flex-auto flex-wrap gap-x-2">
        <dt className="sr-only">Company</dt>
        <dd className="w-full flex-none text-sm font-medium">
          {careerItem.company}
        </dd>
        <dt className="sr-only">Title</dt>
        <dd className="text-xs text-muted-foreground">{careerItem.title}</dd>
        <dt className="sr-only">Date</dt>
        <dd
          className="ml-auto text-xs text-muted-foreground"
          aria-label={`${careerItem.start} until ${careerItem.end}`}
        >
          {careerItem.start} - {careerItem.end}
        </dd>
      </dl>
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
