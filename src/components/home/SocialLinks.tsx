'use client'

import { email, socialLinks } from '@/config/infoConfig'
import { utm_source } from '@/config/siteConfig'
import Link from 'next/link'
import { CustomIcon } from '@/components/shared/CustomIcon'
import { cn } from '@/lib/utils'

export default function SocialLinks({ className }: { className?: string }) {
  return (
    <div className={cn('wrapper justify-start', className)}>
      <ul className="flex items-center justify-start">
        {socialLinks.map((link) => (
          // 社媒内容在 infoConfig.ts 中
          <li key={link.name} className="icon">
            <Link
              href={`${link.href}?utm_source=${utm_source}`}
              target="_blank"
              rel="noreferrer"
              aria-label={link.ariaLabel ?? `Follow on ${link.name}`}
            >
              <CustomIcon name={link.icon} size={18} />
            </Link>
            <span
              className={
                link.icon === 'wechat' ? 'tooltip tooltip-wechat' : 'tooltip'
              }
            >
              {link.name}
            </span>
          </li>
        ))}
        <li className="icon">
          <Link
            href={`mailto:${email}`}
            target="_blank"
            rel="noreferrer"
            aria-label="Email"
          >
            <CustomIcon name="email" size={18} />
          </Link>
          <span className="tooltip">Email</span>
        </li>
      </ul>
    </div>
  )
}
