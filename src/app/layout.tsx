import { type Metadata } from 'next'
import { Noto_Sans_SC } from 'next/font/google'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/layout/Layout'
import { name, headline, introduction } from '@/config/infoConfig'
import '@/styles/tailwind.css'
import 'katex/dist/katex.min.css'

const sans = Noto_Sans_SC({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: {
    template: `%s - ${name}`,
    default: `${name} - ${headline}`,
  },
  description: `${introduction}`,
  alternates: {
    canonical: '/',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="zh-CN"
      className={`h-full antialiased ${sans.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
      </head>
      <body className={`${sans.className} flex h-full`}>
        <Providers>
          <div className="flex w-full">
            <Layout>{children}</Layout>
          </div>
        </Providers>
      </body>
    </html>
  )
}
