import { Container } from '@/components/layout/Container'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Vedio&Books&Music&Games',
  description: '图书、电影、音乐与游戏',
}

export default function BooksMoviesMusicPage() {
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="mx-auto max-w-2xl lg:max-w-5xl">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          图书、电影、音乐与游戏
        </h1>
        <div className="mt-6 space-y-7 text-base text-muted-foreground">
          <p>且将新火试新茶，诗酒趁年华。</p>
          <p>正在施工中🚧</p>
        </div>
      </div>
    </Container>
  )
}
