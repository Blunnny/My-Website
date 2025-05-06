import { Container } from '@/components/layout/Container'
import Image from 'next/image'
import { Star, Eye, Info, CheckCircle } from 'lucide-react'
import { Metadata } from 'next'

const books = [
  {
    title: '动荡时代',
    cover: '/images/books/动荡时代.jpg',
    year: 2021,
    info: '[日]白川方明',
    publisher: '中信出版集团',
    rating: 8.7,
    comment: '在照抄日本的答案之外，我们究竟能从日本的教训中学到什么？',
  },
  {
    title: '动物农场',
    cover: '/images/books/动物农场.jpg',
    year: 2010,
    info: '乔治·奥威尔',
    publisher: '上海译文出版社',
    rating: 9.5,
    comment: '「所有动物都是平等的，但有些动物比其他动物更平等。」',
  },
  {
    title: '估值原理',
    cover: '/images/books/估值原理.jpg',
    year: 2022,
    info: '周洛华',
    publisher: '上海财经大学出版社',
    rating: 8.7,
    comment: '估值的社会学解释。',
  },
  {
    title: '计算广告',
    cover: '/images/books/计算广告.jpg',
    year: 2022,
    info: '刘鹏 / 王超',
    publisher: '人民邮电出版社',
    rating: 8.5,
    comment:
      '读之前以为重点是广告，读完发现重点是计算... 尽管完全理解需要一定计算机背景，但相当值得一读。',
  },
  {
    title: '长安的荔枝',
    cover: '/images/books/长安的荔枝.jpg',
    year: 2022,
    info: '马伯庸',
    publisher: '湖南文艺出版社',
    rating: 8.5,
    comment: '「一骑红尘妃子笑，无人知是荔枝来」',
  },
]

const movies = [
  {
    title: '黑镜 第七季',
    cover: '/images/movies/黑镜.png',
    year: 2025,
    info: '剧情 / 科幻 / 悬疑 / 惊悚 / 犯罪',
    rating: 8.7,
    comment: '暗黑科技向的巅峰之作！',
  },
  {
    title: '破·地狱',
    cover: '/images/movies/破·地狱.jps',
    year: 2024,
    info: '剧情 / 家庭',
    rating: 8.4,
    comment: '「其實生人都係需要破地獄嘅」',
  },
  {
    title: '哪吒之魔童闹海',
    cover: '/images/movies/哪吒之魔童闹海.jps',
    year: 2025,
    info: '剧情 / 喜剧 / 动画 / 奇幻',
    rating: 8.5,
    comment: '首部电影院二刷的电影',
  },
  {
    title: '长安三万里',
    cover: '/images/movies/长安三万里.png',
    year: 2023,
    info: '动画 / 历史',
    rating: 8.3,
    comment: '「诗在，书在，长安就在」',
  },
  {
    title: '影后',
    cover: '/images/movies/影后.jps',
    year: 2024,
    info: '剧情 / 喜剧',
    rating: 8.1,
    comment: '单曲循环「我想要拥有你」中 · · ·',
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
