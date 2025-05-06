import { Container } from '@/components/layout/Container'
import Image from 'next/image'
import { Star, Eye, Info, CheckCircle } from 'lucide-react'
import { Metadata } from 'next'

const books = [
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
    rating: 9.3,
    comment: '估值的社会学解释。',
  },
  {
    title: '长安的荔枝',
    cover: '/images/books/长安的荔枝.jpg',
    year: 2022,
    info: '马伯庸',
    publisher: '湖南文艺出版社',
    rating: 9.3,
    comment: '「一骑红尘妃子笑，无人知是荔枝来」',
  },
  {
    title: '计算广告',
    cover: '/images/books/计算广告.jpg',
    year: 2022,
    info: '刘鹏 / 王超',
    publisher: '人民邮电出版社',
    rating: 9.0,
    comment:
      '读之前以为重点是广告，读完发现重点是计算... 尽管完全理解需要一定计算机背景，但相当值得一读。',
  },
  {
    title: '动荡时代',
    cover: '/images/books/动荡时代.jpg',
    year: 2021,
    info: '[日]白川方明',
    publisher: '中信出版集团',
    rating: 8.5,
    comment: '在照抄日本的答案之外，我们究竟能从日本的教训中学到什么？',
  },
]

const movies = [
  {
    title: '长安三万里',
    cover: '/images/movies/长安三万里.png',
    year: 2023,
    info: '动画 / 历史',
    rating: 9.7,
    comment: '「诗在，书在，长安就在」',
  },
  {
    title: '哪吒之魔童闹海',
    cover: '/images/movies/哪吒之魔童闹海.jpg',
    year: 2025,
    info: '剧情 / 喜剧 / 动画 / 奇幻',
    rating: 9.5,
    comment: '首部电影院二刷的电影',
  },
  {
    title: '黑镜 第七季',
    cover: '/images/movies/黑镜.png',
    year: 2025,
    info: '剧情 / 科幻 / 悬疑 / 惊悚 / 犯罪',
    rating: 9.5,
    comment: '暗黑科技向的巅峰之作！',
  },
  {
    title: '破·地狱',
    cover: '/images/movies/破·地狱.jpg',
    year: 2024,
    info: '剧情 / 家庭',
    rating: 8.9,
    comment: '「其實生人都係需要破地獄嘅」',
  },
  {
    title: '影后',
    cover: '/images/movies/影后.jpg',
    year: 2024,
    info: '剧情 / 喜剧',
    rating: 8.8,
    comment: '单曲循环「我想要拥有你」中 · · ·',
  },
]

const musics = [
  {
    title: '夕阳之歌 In Brasil',
    cover: '/images/musics/夕阳之歌 In Brasil.jpg',
    year: 1989,
    rating: 9.9,
    comment: '「路上紛擾波折再一彎，一天想，想到歸去但已晚」',
  },
  {
    title: '情歌',
    cover: '/images/musics/情歌.jpg',
    year: 2009,
    rating: 9.6,
    comment: '「生命宛如 静静的 相拥的河 永远天长地久」',
  },
  {
    title: '我想要拥有你',
    cover: '/images/musics/我想要拥有你.jpg',
    year: 2024,
    rating: 9.5,
    comment: '出轨の小曲，但是真的好听！',
  },
  {
    title: '有种',
    cover: '/images/musics/有种.jpg',
    year: 2012,
    rating: 9.5,
    comment: '「時來運到 天下無敵 即使最終得個夢」',
  },
  {
    title: '梦里水乡',
    cover: '/images/musics/梦里水乡.jpg',
    year: 2021,
    rating: 9.4,
    comment: '梦回上世纪初的上海滩。',
  },
]

const games = [
  {
    title: 'GTA5',
    cover: '/images/games/GTA5.jpg',
    year: 2015,
    type: '角色扮演 / 冒险 / 动作 / 开放世界',
    rating: 10.0,
    comment: '能打败GTA5的只有GTA6（但GTA6跳票了😭）',
  },
  {
    title: '黑神话·悟空',
    cover: '/images/games/黑神话·悟空.jpg',
    year: 2024,
    type: '游戏 / 角色扮演 / 冒险 / 动作',
    rating: 9.9,
    comment: '「这猴子，真令我欢喜！」',
  },
  {
    title: '赛博朋克 2077 Cyberpunk 2077',
    cover: '/images/games/赛博朋克 2077 Cyberpunk 2077.jpg',
    year: 2020,
    type: '游戏 / 第一人称射击 / 角色扮演 / 冒险 / 动作',
    rating: 9.9,
    comment:
      '「你是愿意当个无名之辈，一辈子安生？还是就算活不到三十岁，也要名留青史呢？」',
  },
  {
    title: '死亡搁浅 DEATH STRANDING',
    cover: '/images/games/死亡搁浅 DEATH STRANDING.jpg',
    year: 2019,
    type: '游戏 / 冒险 / 动作',
    rating: 9.8,
    comment: '试着与这个世界、与这世界中的千万人建立联系。',
  },
  {
    title: '杀戮尖塔 Slay the Spire',
    cover: '/images/games/杀戮尖塔 Slay the Spire.jpg',
    year: 2019,
    type: '游戏 / 横版过关 / 卡牌 / 角色扮演 / 策略',
    rating: 9.5,
    comment: '信仰力量战，一刀999！',
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
                {type === 'game' && item.type && (
                  <span className="ml-2 text-xs text-muted-foreground">
                    {item.type}
                  </span>
                )}
                {type === 'book' && item.publisher && (
                  <span className="ml-2 text-xs text-muted-foreground">
                    {item.publisher}
                  </span>
                )}
                {type !== 'game' && type !== 'book' && item.info && (
                  <span className="ml-2 text-xs text-muted-foreground">
                    {item.info}
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
