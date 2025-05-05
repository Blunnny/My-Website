import { Container } from '@/components/layout/Container'
import Image from 'next/image'
import { Star, Eye, Info, CheckCircle } from 'lucide-react'
import { Metadata } from 'next'

const books = [
  {
    title: '活着',
    cover: '/images/books/book1.jpg',
    year: 1993,
    info: '余华',
    publisher: '作家出版社',
    rating: 9.4,
    comment: '生命的坚韧与苦难，令人动容。',
  },
  {
    title: '百年孤独',
    cover: '/images/books/book2.jpg',
    year: 1967,
    info: '加西亚·马尔克斯',
    publisher: '南海出版公司',
    rating: 9.3,
    comment: '魔幻现实主义的巅峰之作。',
  },
  {
    title: '小王子',
    cover: '/images/books/book3.jpg',
    year: 1943,
    info: '圣埃克苏佩里',
    publisher: '人民文学出版社',
    rating: 9.2,
    comment: '童话外衣下的哲理人生。',
  },
  {
    title: '追风筝的人',
    cover: '/images/books/book4.jpg',
    year: 2003,
    info: '卡勒德·胡赛尼',
    publisher: '上海人民出版社',
    rating: 9.1,
    comment: '关于救赎与成长的动人故事。',
  },
  {
    title: '三体',
    cover: '/images/books/book5.jpg',
    year: 2008,
    info: '刘慈欣',
    publisher: '重庆出版社',
    rating: 9.0,
    comment: '中国科幻的里程碑。',
  },
]

const movies = [
  {
    title: 'The Shawshank Redemption',
    cover: '/images/movies/movie1.jpg',
    year: 1994,
    info: '2h 22m',
    rating: 9.3,
    votes: '3M',
  },
  {
    title: 'The Godfather',
    cover: '/images/movies/movie2.jpg',
    year: 1972,
    info: '2h 55m',
    rating: 9.2,
    votes: '2.1M',
  },
  {
    title: 'The Dark Knight',
    cover: '/images/movies/movie3.jpg',
    year: 2008,
    info: '2h 32m',
    rating: 9.0,
    votes: '3M',
  },
  {
    title: 'The Godfather Part II',
    cover: '/images/movies/movie4.jpg',
    year: 1974,
    info: '3h 22m',
    rating: 9.0,
    votes: '1.4M',
  },
  {
    title: '12 Angry Men',
    cover: '/images/movies/movie5.jpg',
    year: 1957,
    info: '1h 36m',
    rating: 9.0,
    votes: '923K',
  },
]

const musics = [
  {
    title: 'Yesterday Once More',
    cover: '/images/musics/music1.jpg',
    year: 1973,
    info: 'Carpenters',
    rating: 9.5,
    votes: '1.2M',
  },
  {
    title: 'Let It Be',
    cover: '/images/musics/music2.jpg',
    year: 1970,
    info: 'The Beatles',
    rating: 9.4,
    votes: '1.1M',
  },
  {
    title: '晴天',
    cover: '/images/musics/music3.jpg',
    year: 2003,
    info: '周杰伦',
    rating: 9.3,
    votes: '900K',
  },
  {
    title: 'Shape of You',
    cover: '/images/musics/music4.jpg',
    year: 2017,
    info: 'Ed Sheeran',
    rating: 9.2,
    votes: '850K',
  },
  {
    title: '夜空中最亮的星',
    cover: '/images/musics/music5.jpg',
    year: 2011,
    info: '逃跑计划',
    rating: 9.1,
    votes: '800K',
  },
]

const games = [
  {
    title: 'The Legend of Zelda: Breath of the Wild',
    cover: '/images/games/game1.jpg',
    year: 2017,
    info: 'Switch',
    rating: 9.7,
    votes: '1.5M',
  },
  {
    title: 'Minecraft',
    cover: '/images/games/game2.jpg',
    year: 2011,
    info: 'Multi',
    rating: 9.6,
    votes: '2.0M',
  },
  {
    title: 'The Witcher 3: Wild Hunt',
    cover: '/images/games/game3.jpg',
    year: 2015,
    info: 'PC/PS4/XB1',
    rating: 9.5,
    votes: '1.3M',
  },
  {
    title: 'Red Dead Redemption 2',
    cover: '/images/games/game4.jpg',
    year: 2018,
    info: 'PS4/XB1/PC',
    rating: 9.4,
    votes: '1.1M',
  },
  {
    title: '塞尔达传说：时之笛',
    cover: '/images/games/game5.jpg',
    year: 1998,
    info: 'N64',
    rating: 9.3,
    votes: '900K',
  },
]

function Section({
  title,
  items,
  type,
}: {
  title: string
  items: any[]
  type: string
}) {
  return (
    <div className="mb-12">
      <h2 className="mb-4 text-2xl font-bold tracking-tight text-foreground">
        {title}
      </h2>
      <ul className="divide-y divide-muted-foreground/10">
        {items.map((item, idx) => (
          <li key={item.title} className="flex items-center gap-4 py-4">
            <div className="relative h-20 w-14 flex-shrink-0 overflow-hidden rounded-md shadow">
              <Image
                src={item.cover}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold">
                  {idx + 1}. {item.title}
                </span>
                <span className="ml-2 text-xs text-muted-foreground">
                  {item.year}
                </span>
                <span className="ml-2 text-xs text-muted-foreground">
                  {item.info}
                </span>
                {type === 'book' && item.publisher && (
                  <span className="ml-2 text-xs text-muted-foreground">
                    {item.publisher}
                  </span>
                )}
              </div>
              <div className="mt-2 flex items-center gap-2 text-sm">
                <span className="text-xs text-muted-foreground">
                  {item.comment || '这是一段我的评价。'}
                </span>
              </div>
            </div>
            <div className="ml-2 flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-400" fill="#facc15" />
              <span className="font-semibold">{item.rating}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export const metadata: Metadata = {
  title: 'Entertainment',
  description: '图书、电影、音乐与游戏',
}

export default function BooksMoviesMusicPage() {
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="mx-auto max-w-2xl lg:max-w-4xl">
        <h1 className="mb-8 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          且将新火试新茶，诗酒趁年华
        </h1>
        <Section title="字里行间，卧游千山" items={books} type="book" />
        <Section title="二十四帧人间世" items={movies} type="movie" />
        <Section title="单曲循环！" items={musics} type="music" />
        <Section title="Play hard, die fast" items={games} type="game" />
      </div>
    </Container>
  )
}
