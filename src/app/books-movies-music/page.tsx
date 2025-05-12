'use client'
import { useState } from 'react'
import { Container } from '@/components/layout/Container'
import Image from 'next/image'
import { Star, Eye, Info, CheckCircle } from 'lucide-react'

// 2021-2024年度分组数据，2024年有内容，其余留空
const booksByYear: Record<string, any[]> = {
  2024: [
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
      rating: 9.1,
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
  ],
  2023: [
    {
      title: '宏观经济数据分析手册',
      cover: '/images/books/宏观经济数据分析手册.jpg',
      year: 2021,
      info: '李奇霖',
      publisher: '上海财经大学出版社',
      rating: 9.6,
      comment: '最好的经济工具书之一！',
    },
    {
      title: '寻觅意义',
      cover: '/images/books/寻觅意义.jpg',
      year: 2022,
      info: '王德峰',
      publisher: '山东文艺出版社',
      rating: 9.5,
      comment:
        '「当宏大叙事已经解体的今天，叙事并没有停止，而是化为了一些小叙事。在无数的小叙事中，我们重新编织起生命的意义。」"',
    },
    {
      title: '金榜题名之后',
      cover: '/images/books/金榜题名之后.jpg',
      year: 2023,
      info: '郑雅君',
      publisher: '上海三联书店',
      rating: 9.1,
      comment: '大一新生必读书目。',
    },

    {
      title: '窗边的小豆豆',
      cover: '/images/books/窗边的小豆豆.jpg',
      year: 2003,
      info: '[日] 黑柳彻子',
      publisher: '南海出版公司',
      rating: 9.0,
      comment: '教育不是注满一桶水，而是点燃一把火。',
    },
    {
      title: '13 67',
      cover: '/images/books/13 67.jpg',
      year: 2014,
      info: '陳浩基',
      publisher: '皇冠文化出版有限公司',
      rating: 9.0,
      comment: '专属于香港的传奇故事。',
    },
  ],
  2022: [
    {
      title: '置身事内',
      cover: '/images/books/置身事内.jpg',
      year: 2021,
      info: '兰小欢',
      publisher: '上海人民出版社',
      rating: 9.7,
      comment: '「站在岸边只看到波澜壮阔，看不见暗潮汹涌。」',
    },
    {
      title: '结构性改革',
      cover: '/images/books/结构性改革.jpg',
      year: 2020,
      info: '黄奇帆',
      publisher: '中信出版社',
      rating: 9.5,
      comment: '高屋建瓴，值得反复阅读。',
    },
    {
      title: '大国大城',
      cover: '/images/books/大国大城.jpg',
      year: 2016,
      info: '陆铭',
      publisher: '上海人民出版社',
      rating: 9.3,
      comment: '北上广深的问题不是城市太大，而是还不够大。',
    },

    {
      title: '故事便利店',
      cover: '/images/books/故事便利店.jpg',
      year: 2022,
      info: '骆以军',
      publisher: '河南文艺出版社',
      rating: 8.5,
      comment: '有种小时读意林、格言和读者的感觉。',
    },
    {
      title: '诡计博物馆',
      cover: '/images/books/诡计博物馆.jpg',
      year: 2020,
      info: '[日]大山诚一郎',
      publisher: '上海文艺出版社',
      rating: 8.5,
      comment: '最爱《复仇日记》这篇，有点东野圭吾的味道。',
    },
  ],
}

const moviesByYear: Record<string, any[]> = {
  2025: [
    {
      title: '哪吒之魔童闹海',
      cover: '/images/movies/哪吒之魔童闹海.jpg',
      year: 2025,
      info: '剧情 / 喜剧 / 动画 / 奇幻',
      rating: 9.5,
      comment: '首部电影院二刷的电影。',
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
      comment: '「其實生人都係需要破地獄嘅。」',
    },
    {
      title: '影后',
      cover: '/images/movies/影后.jpg',
      year: 2024,
      info: '剧情 / 喜剧',
      rating: 8.8,
      comment: '单曲循环「我想要拥有你」中 · · ·',
    },
    {
      title: '死侍与金刚狼 Deadpool & Wolverine ',
      cover: '/images/movies/死侍与金刚狼.jpg',
      year: 2024,
      info: '剧情 / 家庭',
      rating: 8.5,
      comment: '漫威挽尊之作。',
    },
  ],
  2024: [
    {
      title: '长安三万里',
      cover: '/images/movies/长安三万里.png',
      year: 2023,
      info: '动画 / 历史',
      rating: 9.7,
      comment: '「诗在，书在，长安就在」',
    },
    {
      title: '硅谷 Silicon Valley',
      cover: '/images/movies/硅谷.jpg',
      year: '2014-2019',
      info: '喜剧 / 剧情',
      rating: 9.8,
      comment: 'make the world a better place!',
    },
    {
      title: '齐木楠雄的灾难',
      cover: '/images/movies/齐木楠雄的灾难.jpg',
      year: '2016-2019',
      info: '剧情 / 喜剧 / 动画 / 奇幻',
      rating: 9.3,
      comment: '下饭小神剧。',
    },
    {
      title: '沙丘2 Dune: Part Two',
      cover: '/images/movies/沙丘2.jpg',
      year: 2024,
      info: '剧情 / 动作 / 科幻 / 冒险',
      rating: 9.4,
      comment: '独特的沙漠美学，值得一看。',
    },
    {
      title: '鬼灭之刃 鬼滅の刃',
      cover: '/images/movies/鬼灭之刃.jpg',
      year: 2019,
      info: '动画 / 奇幻',
      rating: 9.0,
      comment: '「老去或是死亡，都是人类短暂生命的美妙之处。」',
    },
  ],
  2023: [
    {
      title: '生活大爆炸 The Big Bang Theory',
      cover: '/images/movies/生活大爆炸.jpg',
      year: '2007-2018',
      info: '喜剧 / 爱情',
      rating: 9.8,
      comment: '永远的经典！',
    },
    {
      title: '布达佩斯大饭店 The Grand Budapest Hotel',
      cover: '/images/movies/布达佩斯大饭店.jpg',
      year: 2014,
      info: '喜剧 / 剧情',
      rating: 9.5,
      comment: '用复古的色调，大师的配乐，和冷不丁的幽默记录一个时代的逝去。',
    },
    {
      title: '寻梦环游记 Coco',
      cover: '/images/movies/寻梦环游记.jpg',
      year: 2017,
      info: '喜剧 / 动画 / 音乐 / 奇幻',
      rating: 9.5,
      comment: '「死亡不是生命的终点，遗忘才是。」',
    },
    {
      title: '星期三',
      cover: '/images/movies/星期三.jpg',
      year: 2022,
      info: '喜剧 / 悬疑 / 犯罪 / 奇幻',
      rating: 9.3,
      comment: '太爱星期三和小狼女了。',
    },
    {
      title: '四月是你的谎言 四月は君の嘘',
      cover: '/images/movies/四月是你的谎言.jpg',
      year: 2014,
      info: '剧情 / 动画 / 音乐',
      rating: 9.3,
      comment: '初中看完结局一个月没走出来，现在在看仍然感动。',
    },
  ],
  2022: [
    {
      title: '头号玩家 Ready Player One',
      cover: '/images/movies/头号玩家.jpg',
      year: 2018,
      info: '动作 / 科幻 / 冒险',
      rating: 9.6,
      comment: '「谢谢你来玩我的游戏。」',
    },
    {
      title: '蜘蛛侠：平行宇宙 Spider-Man: Into the Spider-Verse',
      cover: '/images/movies/蜘蛛侠：平行宇宙.jpg',
      year: 2018,
      info: '动作 / 科幻 / 动画 / 冒险',
      rating: 9.4,
      comment: '动画想象力的巅峰之作！',
    },
    {
      title: '乔乔的异想世界 Jojo Rabbit',
      cover: '/images/movies/乔乔的异想世界.jpg',
      year: 2019,
      info: '剧情 / 喜剧 / 战争',
      rating: 9.3,
      comment: '「等你自由了，你第一件事要做什么？跳舞」',
    },
    {
      title: '模仿游戏 The Imitation Game',
      cover: '/images/movies/模仿游戏.jpg',
      year: 2014,
      info: '剧情 / 同性 / 传记 / 战争',
      rating: 9.2,
      comment: '人和机器的区别究竟是什么呢？',
    },
    {
      title: '调音师 Andhadhun',
      cover: '/images/movies/调音师.jpg',
      year: 2018,
      info: '喜剧 / 悬疑 / 惊悚 / 犯罪',
      rating: 9.1,
      comment: '年度最佳悬疑片！',
    },
  ],
}

const musicsByYear: Record<string, any[]> = {
  2025: [
    {
      title: '夕阳之歌 In Brasil',
      cover: '/images/musics/夕阳之歌 In Brasil.jpg',
      year: 1989,
      artist: '梅艳芳',
      rating: 9.9,
      comment: '「路上紛擾波折再一彎，一天想，想到歸去但已晚」',
    },
    {
      title: '情歌',
      cover: '/images/musics/情歌.jpg',
      year: 2009,
      artist: '梁静茹',
      rating: 9.6,
      comment: '「生命宛如 静静的 相拥的河 永远天长地久」',
    },
    {
      title: '我想要拥有你',
      cover: '/images/musics/我想要拥有你.jpg',
      year: 2024,
      artist: '小男孩乐团',
      rating: 9.5,
      comment: '出轨の小曲，但是真的好听！',
    },
    {
      title: '有种',
      cover: '/images/musics/有种.jpg',
      year: 2012,
      artist: '郑中基',
      rating: 9.5,
      comment: '「時來運到 天下無敵 即使最終得個夢」',
    },
    {
      title: '梦里水乡',
      cover: '/images/musics/梦里水乡.jpg',
      year: 2021,
      artist: '陈婧霏',
      rating: 9.4,
      comment: '梦回上世纪初的上海滩。',
    },
  ],
  2024: [
    {
      title: '突然的自我',
      cover: '/images/musics/突然的自我.jpg',
      year: 2004,
      artist: '伍佰',
      rating: 9.7,
      comment: '「那就不再留 时光一过不再有」',
    },
    {
      title: '野孩子',
      cover: '/images/musics/野孩子.jpg',
      year: 2001,
      artist: '杨千嬅',
      rating: 9.5,
      comment: '「我也笑我原來是個天生的野孩子 連沒有幸福都不介意」',
    },
    {
      title: '阳光男孩 阳光女孩',
      cover: '/images/musics/阳光男孩 阳光女孩.jpg',
      year: 2005,
      artist: 'TG4',
      rating: 9.5,
      comment: '「你的童年我的童年 好像都一样」',
    },
    {
      title: '唯一',
      cover: '/images/musics/唯一.jpg',
      year: 2020,
      artist: '告五人',
      rating: 9.3,
      comment: '「你不想证明 证明我是你唯一」',
    },
    {
      title: '万水千山总是情',
      cover: '/images/musics/万水千山总是情.jpg',
      year: 1982,
      artist: '汪明荃',
      rating: 9.2,
      comment: '「聚散也有天註定 不怨天不怨命 但求有山水共作證」',
    },
  ],
  2023: [
    {
      title: '真的爱你',
      cover: '/images/musics/真的爱你.jpg',
      year: 1989,
      artist: 'Beyond',
      rating: 9.9,
      comment: '「是妳多麼溫馨的目光 教我堅毅望著前路」',
    },
    {
      title: '小镇姑娘',
      cover: '/images/musics/小镇姑娘.jpg',
      year: 1999,
      artist: '陶喆',
      rating: 9.5,
      comment: '「或許妳會有一天懷念 可是我已不在」',
    },
    {
      title: '国王与法老',
      cover: '/images/musics/国王与法老.jpg',
      year: 2021,
      artist: '法老/杨和苏/张馨月',
      rating: 9.0,
      comment: '「还是那么骄狂 如果我弹钢琴就像肖邦」',
    },
    {
      title: '没有理想的人不伤心',
      cover: '/images/musics/没有理想的人不伤心.jpg',
      year: 2013,
      artist: '新裤子',
      rating: 9.1,
      comment: '「我不要在失败孤独中死去 我不要一直活在地下里」',
    },
    {
      title: '在草地上肆意奔跑',
      cover: '/images/musics/在草地上肆意奔跑.jpg',
      year: 2022,
      artist: '傅如乔',
      rating: 9.0,
      comment: '「要肆意奔跑白天到晚上 直到我看见天空变微亮」',
    },
  ],
  2022: [
    {
      title: '单车',
      cover: '/images/musics/单车.jpg',
      year: 2001,
      artist: '陈奕迅',
      rating: 9.8,
      comment: '「難離難捨想抱緊些 茫茫人生好像荒野」',
    },
    {
      title: '涙そうそう (泪光闪闪) ',
      cover: '/images/musics/涙そうそう.jpg',
      year: 2001,
      artist: '夏川りみ',
      rating: 9.5,
      comment:
        '「想い出遠くあせても、おもかげ探してよみがえる日は 涙そうそう」',
    },
    {
      title: '小宇',
      cover: '/images/musics/小宇.jpg',
      year: 2007,
      artist: '张震岳',
      rating: 9.5,
      comment: '「总有些惊奇的际遇 比方说当我遇见你」',
    },
    {
      title: '亲爱的',
      cover: '/images/musics/亲爱的.jpg',
      year: 2009,
      artist: '潘玮柏',
      rating: 9.3,
      comment: '「我 叮咚的 弹奏着 故事里那首儿歌 缤纷的音乐盒木马还旋转着」',
    },
    {
      title: '缘分一道桥',
      cover: '/images/musics/缘分一道桥.jpg',
      year: 2016,
      artist: '王力宏 / 谭维维',
      rating: 9.0,
      comment: '「谈爱恨不能潦草 战鼓敲啊敲 用信任立下誓言我来熬」',
    },
  ],
}

const games = [
  {
    title: 'GTA5',
    cover: '/images/games/GTA5.jpg',
    year: 2015,
    type: '角色扮演 / 冒险 / 动作 / 开放世界',
    rating: 10.0,
    comment: 'GTA6不要跳票了😭',
  },
  {
    title: '黑神话·悟空',
    cover: '/images/games/黑神话·悟空.jpg',
    year: 2024,
    type: '游戏 / 角色扮演 / 冒险 / 动作',
    rating: 9.9,
    comment: '踏平坎坷成大道！',
  },
  {
    title: '艾尔登法环 Elden Ring',
    cover: '/images/games/艾尔登法环.jpg',
    year: 2022,
    type: '游戏 / 角色扮演 / 冒险 / 动作',
    rating: 9.8,
    comment: '「即使引导早已破碎，也请您当上艾尔登之王。」',
  },
  {
    title: '赛博朋克 2077 Cyberpunk 2077',
    cover: '/images/games/赛博朋克 2077 Cyberpunk 2077.jpg',
    year: 2020,
    type: '游戏 / 第一人称射击 / 角色扮演 / 冒险 / 动作',
    rating: 9.8,
    comment:
      '「你是愿意当个无名之辈，一辈子安生？还是就算活不到三十岁，也要名留青史呢？」',
  },
  {
    title: '死亡搁浅 DEATH STRANDING',
    cover: '/images/games/死亡搁浅 DEATH STRANDING.jpg',
    year: 2019,
    type: '游戏 / 冒险 / 动作',
    rating: 9.8,
    comment: '用开罗尔网络重新编织千万条羁绊的绳结。',
  },
]

function YearSection({
  title,
  dataByYear,
  type,
}: {
  title: string
  dataByYear: Record<string, any[]>
  type: string
}) {
  // 如果是图书部分，过滤掉2021年
  const years = Object.keys(dataByYear)
    .filter((y) => !(type === 'book' && y === '2021'))
    .sort((a, b) => b.localeCompare(a))
  const [year, setYear] = useState(years[0])
  return (
    <div className="mb-12">
      <h2 className="mb-4 text-2xl font-bold tracking-tight text-foreground">
        {title}
      </h2>
      <div className="mb-4 flex items-center gap-2">
        <span className="text-base font-medium text-muted-foreground">
          年度 TOP5
        </span>
        {years.map((y) => (
          <button
            key={y}
            className={`rounded-full border px-4 py-1 text-sm transition-colors ${year === y ? 'bg-primary text-primary-foreground' : 'bg-background text-foreground hover:bg-muted'}`}
            onClick={() => setYear(y)}
          >
            {y}
          </button>
        ))}
      </div>
      <ul className="divide-y divide-muted-foreground/10">
        {[...dataByYear[year]]
          .sort((a, b) => b.rating - a.rating)
          .map((item, idx) => (
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
                  {type === 'book' && item.info && (
                    <span className="ml-2 text-xs text-muted-foreground">
                      {item.info}
                    </span>
                  )}
                  {type === 'music' && item.artist && (
                    <span className="ml-2 text-xs text-muted-foreground">
                      {item.artist}
                    </span>
                  )}
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
                  {type !== 'game' &&
                    type !== 'book' &&
                    type !== 'music' &&
                    item.info && (
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
                <span className="font-semibold">{item.rating.toFixed(1)}</span>
              </div>
            </li>
          ))}
      </ul>
    </div>
  )
}

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
        {[...items]
          .sort((a, b) => b.rating - a.rating)
          .map((item, idx) => (
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
                  {type === 'book' && item.info && (
                    <span className="ml-2 text-xs text-muted-foreground">
                      {item.info}
                    </span>
                  )}
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
                <span className="font-semibold">{item.rating.toFixed(1)}</span>
              </div>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default function BooksMoviesMusicPage() {
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="mx-auto max-w-2xl lg:max-w-4xl">
        <h1 className="mb-8 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          且将新火试新茶，诗酒趁年华
        </h1>
        <YearSection
          title="字里行间，卧游千山"
          dataByYear={booksByYear}
          type="book"
        />
        <YearSection
          title="二十四帧人间世"
          dataByYear={moviesByYear}
          type="movie"
        />
        <YearSection
          title="单曲循环！"
          dataByYear={musicsByYear}
          type="music"
        />
        <Section
          title="All work and no play makes Jack a dull boy"
          items={games}
          type="game"
        />
      </div>
    </Container>
  )
}
