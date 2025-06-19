import Link from 'next/link'

import { ContainerInner, ContainerOuter } from '@/components/layout/Container'
import { name } from '@/config/infoConfig'
import SocialLinks from '@/components/home/SocialLinks'

export function Footer() {
  return (
    <footer className="mt-32 flex-none">
      <ContainerOuter>
        <div className="border-t border-muted pb-16 pt-10">
          <ContainerInner>
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row sm:items-start">
              <div className="flex w-full flex-col items-center justify-between gap-6 sm:flex-row sm:items-center">
                <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm font-medium">
                  <SocialLinks className="mt-0" />
                </div>
                <div className="mt-2 flex flex-row items-center justify-center gap-2 sm:mt-0">
                  <p className="text-sm text-muted-foreground">
                    &copy; {new Date().getFullYear()} {name} All rights
                    reserved.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;鲁ICP备
                    2025159378号
                  </p>
                </div>
              </div>
            </div>
          </ContainerInner>
        </div>
      </ContainerOuter>
    </footer>
  )
}
