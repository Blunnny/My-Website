'use client'
import { useState } from 'react'
import { Container } from '@/components/layout/Container'
import Image from 'next/image'
import { Star, Eye, Info, CheckCircle } from 'lucide-react'

// 图书
const booksByYear: Record<string, any[]> = {
  2025: [
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
  ],
  2024: [
    {
      title: '长安的荔枝',
      cover: '/images/books/长安的荔枝.jpg',
      year: 2022,
      info: '马伯庸',
      publisher: '湖南文艺出版社',
      rating: 9.3,
      comment:
        '「他这个人哪，笨拙，胆小，窝囊，可一定会豁出命去守护他所珍视的东西。」',
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
  ],
  2023: [
    {
      title: '金融经济学二十五讲',
      cover: '/images/books/金融经济学二十五讲.jpg',
      year: 2018,
      info: '徐高',
      publisher: '中国人民大学出版社',
      rating: 9.3,
      comment: '金融学入门必读书目。',
    },
    {
      title: '穿透财报',
      cover: '/images/books/穿透财报.jpg',
      year: 2023,
      info: '邹佩轩',
      publisher: '人民邮电出版社',
      rating: 9.1,
      comment: '兼具理论深度与实践的二级市场财报分析指南。',
    },
    {
      title: '估值建模',
      cover: '/images/books/估值建模.jpg',
      year: 2011,
      info: '诚迅金融培训公司',
      publisher: '中国金融出版社',
      rating: 9.0,
      comment: '野鸡培训机构的良心出品。',
    },
    {
      title: '高级计量经济学及Stata应用',
      cover: '/images/books/计量经济学.jpg',
      year: 2014,
      info: '陈强',
      publisher: '高等教育出版社',
      rating: 9.5,
      comment: '拯救了我毕业论文的神书！',
    },
    {
      title: '投资中最简单的事',
      cover: '/images/books/投资中最简单的事.jpg',
      year: 2014,
      info: '邱国鹭',
      publisher: '中国人民大学出版社',
      rating: 9.0,
      comment: '了解价值投资的入门书。',
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
      title: '证券分析师实践指南',
      cover: '/images/books/证券分析师实践指南.jpg',
      year: 2018,
      info: '[美] 詹姆斯·J.瓦伦丁',
      publisher: '机械工业出版社',
      rating: 9.2,
      comment: '了解证券分析师的日常工作。',
    },
    {
      title: '股市进阶之道',
      cover: '/images/books/股市进阶之道.jpg',
      year: 2014,
      info: '李杰',
      publisher: '中国铁道出版社',
      rating: 9.0,
      comment: '一个韭菜的自我修养。',
    },
  ],
  2021: [
    {
      title: '恶意',
      cover: '/images/books/恶意.jpg',
      year: 2016,
      info: '[日] 东野圭吾',
      publisher: '南海出版公司',
      rating: 8.3,
      comment:
        '「令他害怕的，并非暴力本身，而是那些讨厌自己的人所散发的负面能量。」',
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
    {
      title: '金榜题名之后',
      cover: '/images/books/金榜题名之后.jpg',
      year: 2023,
      info: '郑雅君',
      publisher: '上海三联书店',
      rating: 9.1,
      comment: '大一新生必读书目。',
    },
  ],
  2020: [
    {
      title: '万历十五年',
      cover: '/images/books/万历十五年.jpg',
      year: 1997,
      info: '[美] 黄仁宇',
      publisher: '新知三联书店',
      rating: 9.5,
      comment: '大明王朝衰败的症结。',
    },
    {
      title: '激荡三十年',
      cover: '/images/books/激荡三十年.jpg',
      year: 2017,
      info: '吴晓波',
      publisher: '中信出版社',
      rating: 9.0,
      comment: '波澜壮阔，迷茫无奈。',
    },
    {
      title: '诡计博物馆',
      cover: '/images/books/诡计博物馆.jpg',
      year: 2020,
      info: '[日] 大山诚一郎',
      publisher: '上海文艺出版社',
      rating: 8.5,
      comment: '最爱《复仇日记》这篇，有点东野圭吾的味道。',
    },
    {
      title: '故事便利店',
      cover: '/images/books/故事便利店.jpg',
      year: 2022,
      info: '骆以军',
      publisher: '河南文艺出版社',
      rating: 8.3,
      comment: '有种小时读意林、格言和读者的感觉。',
    },
  ],
  2019: [
    {
      title: '1984',
      cover: '/images/books/1984.jpg',
      year: 2010,
      info: '[英] 乔治·奥威尔',
      publisher: '北京十月文艺出版社',
      rating: 9.8,
      comment: '「战争即和平，自由即奴役，无知即力量。」',
    },
    {
      title: '三体',
      cover: '/images/books/三体.jpg',
      year: 2008,
      info: '刘慈欣',
      publisher: '重庆出版社',
      rating: 9.8,
      comment: '「给岁月以文明，而不是给文明以岁月。」',
    },
    {
      title: '东方快车谋杀案',
      cover: '/images/books/东方快车谋杀案.jpg',
      year: 2006,
      info: '[英] 阿加莎·克里斯蒂',
      publisher: '人民文学出版社',
      rating: 9.5,
      comment: '推理小说经典之作。',
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
  ],
}

// 电影
const moviesByYear: Record<string, any[]> = {
  2025: [
    {
      title: '哪吒之魔童闹海',
      cover: '/images/movies/哪吒之魔童闹海.jpg',
      year: 2025,
      info: '剧情 / 喜剧 / 动画 / 奇幻',
      rating: 9.7,
      comment:
        '「我乃哪吒三太子，能降妖来会作诗。今日到此锄奸恶，尔等妖魔快受死。」',
    },
    {
      title: '葬送的芙莉莲 葬送のフリーレン',
      cover: '/images/movies/葬送的芙莉莲.webp',
      year: 2023,
      info: '动画 / 奇幻 / 冒险',
      rating: 9.6,
      comment: '「如果能再了解你一点就好了。」',
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
      title: '成瘾剂量 Dopesick ',
      cover: '/images/movies/成瘾剂量 Dopesick.webp',
      year: 2021,
      info: '剧情',
      rating: 9.3,
      comment: '「Pain torments us, but it is an inevitable part of life.」',
    },
    {
      title: '破·地狱',
      cover: '/images/movies/破·地狱.jpg',
      year: 2024,
      info: '剧情 / 家庭',
      rating: 8.9,
      comment: '「其實生人都係需要破地獄嘅。」',
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
      comment: 'Make the world a better place!',
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
      comment: '独特的沙漠美学。',
    },
    {
      title: '影后',
      cover: '/images/movies/影后.jpg',
      year: 2024,
      info: '剧情 / 喜剧',
      rating: 8.8,
      comment: '单曲循环「我想要拥有你」中 · · ·',
    },
  ],
  2023: [
    {
      title: '生活大爆炸 The Big Bang Theory',
      cover: '/images/movies/生活大爆炸.jpg',
      year: '2007-2018',
      info: '喜剧 / 爱情',
      rating: 9.9,
      comment: '永远的经典！',
    },

    {
      title: '寻梦环游记 Coco',
      cover: '/images/movies/寻梦环游记.jpg',
      year: 2017,
      info: '喜剧 / 动画 / 音乐 / 奇幻',
      rating: 9.6,
      comment: '「死亡不是生命的终点，遗忘才是。」',
    },
    {
      title: '里斯本丸沉没',
      cover: '/images/movies/里斯本丸沉没.webp',
      year: 2023,
      info: '纪录片',
      rating: 9.4,
      comment: '「活下来的人并没有真正活着，在很久之后我才意识到这一点。」',
    },
    {
      title: '周处除三害',
      cover: '/images/movies/周处除三害.webp',
      year: 2023,
      info: '动作 / 犯罪',
      rating: 9.0,
      comment: '「时间差不多咯！」',
    },
    {
      title: '中国奇谭',
      cover: '/images/movies/中国奇谭.webp',
      year: 2023,
      info: '动画 / 短片 / 奇幻',
      rating: 9.4,
      comment: '「送货郎，你丢的究竟是鹅，还是那心上人？」',
    },
  ],
  2022: [
    {
      title: 'JOJO的奇妙冒险',
      cover: '/images/movies/JOJO的奇妙冒险.webp',
      year: '2012 - 2021',
      info: '剧情 / 动作 / 动画 / 冒险',
      rating: 9.8,
      comment: '「这是替身攻击！」',
    },
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
      title: '赛博朋克：边缘行者 Cyberpunk: Edgerunners',
      cover: '/images/movies/赛博朋克.webp',
      year: 2022,
      info: '动作 / 科幻 / 动画 / 惊悚 / 犯罪 / 冒险',
      rating: 9.5,
      comment: '「子弹杯里兑伏特加加冰，兑小可可乐，生的伟大，死的光荣。」',
    },
    {
      title: '星期三',
      cover: '/images/movies/星期三.jpg',
      year: 2022,
      info: '喜剧 / 悬疑 / 犯罪 / 奇幻',
      rating: 9.3,
      comment: '太爱星期三和小狼女了。',
    },
  ],
  2021: [
    {
      title: '英雄联盟：双城之战 第一季 Arcane Season 1',
      cover: '/images/movies/英雄联盟：双城之战.webp',
      year: 2021,
      info: '动作 / 科幻 / 动画 / 冒险',
      rating: 9.3,
      comment: '「JINX means jinx!」',
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
      title: '遇见你之前 Me Before You',
      cover: '/images/movies/遇见你之前.webp',
      year: 2016,
      info: '剧情 / 爱情',
      rating: 9.0,
      comment: '龙妈的眉毛不要再跳了！！！',
    },
    {
      title: '你的名字。 君の名は。',
      cover: '/images/movies/你的名字.webp',
      year: 2016,
      info: '剧情 / 爱情 / 动画',
      rating: 9.3,
      comment:
        '「神明如果真的在的话，要许下什么愿望才好，我自己其实也不知道。」',
    },
    {
      title: "海上钢琴师 La leggenda del pianista sull'oceano",
      cover: '/images/movies/海上钢琴师.webp',
      year: 1998,
      info: '剧情 / 音乐',
      rating: 9.8,
      comment: "「All that city you just couldn't see an end to it.」",
    },
  ],
  2020: [
    {
      title: '鬼灭之刃 鬼滅の刃',
      cover: '/images/movies/鬼灭之刃.jpg',
      year: 2019,
      info: '动画 / 奇幻',
      rating: 9.6,
      comment: '「老去或是死亡，都是人类短暂生命的美妙之处。」',
    },
    {
      title: '利刃出鞘 Knives Out',
      cover: '/images/movies/利刃出鞘.webp',
      year: 2019,
      info: '剧情 / 喜剧 / 悬疑 / 犯罪',
      rating: 9.0,
      comment: '值得一看的悬疑小品。',
    },
    {
      title: '华尔街之狼 The Wolf of Wall Street',
      cover: '/images/movies/华尔街之狼.webp',
      year: 2013,
      info: '剧情 / 传记 / 犯罪',
      rating: 9.4,
      comment:
        '「The art of making money is learning to receive life and enjoy it.」',
    },
    {
      title: '想见你 想見你',
      cover: '/images/movies/想见你.webp',
      year: 2019,
      info: '爱情 / 悬疑 / 奇幻',
      rating: 9.6,
      comment: '「想见你 只想见你 未来过去 我只想见你」',
    },
    {
      title: '权力的游戏',
      cover: '/images/movies/权力的游戏.webp',
      year: '2011-2019',
      info: '剧情 / 奇幻 / 冒险',
      rating: 9.5,
      comment: '重拍第八季！',
    },
  ],
  2019: [
    {
      title: '绿皮书 Green Book',
      cover: '/images/movies/绿皮书.webp',
      year: 2018,
      info: '剧情 / 喜剧 / 音乐 / 传记',
      rating: 9.7,
      comment: "「They don't have a choice, but you do.」",
    },
    {
      title: '加勒比海盗系列 Pirates of the Caribbean',
      cover: '/images/movies/加勒比海盗.webp',
      year: '2003-2017',
      info: '动作 / 冒险 / 奇幻 / 剧情',
      rating: 9.3,
      comment: '「Dying is the day worth living for!」',
    },
    {
      title: '布达佩斯大饭店 The Grand Budapest Hotel',
      cover: '/images/movies/布达佩斯大饭店.jpg',
      year: 2014,
      info: '喜剧 / 剧情',
      rating: 9.5,
      comment: '复古的色调，大师的配乐再加一点冷不丁的幽默',
    },
    {
      title: '复仇者联盟4：终局之战 Avengers: Endgame',
      cover: '/images/movies/复仇者联盟4.webp',
      year: 2019,
      info: '剧情 / 动作 / 科幻 / 奇幻 / 冒险',
      rating: 9.5,
      comment: '「I am Iron Man.」',
    },
    {
      title: '垫底辣妹 ビリギャル',
      cover: '/images/movies/垫底辣妹.webp',
      year: 2015,
      info: '剧情 / 家庭',
      rating: 8.8,
      comment: '「把目标降低一次，就会越来越低的。」',
    },
  ],
}

// 音乐
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
      comment: '你什么时候开始听这种歌？好青春喔。',
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
      title: '可不可以',
      cover: '/images/musics/可不可以.jpg',
      year: 2018,
      artist: '张紫豪',
      rating: 8.5,
      comment: '她不一样😭',
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
      title: '梦里水乡',
      cover: '/images/musics/梦里水乡.jpg',
      year: 2021,
      artist: '陈婧霏',
      rating: 9.4,
      comment: '梦回上世纪初的上海滩。',
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
      rating: 9.6,
      comment: '「或許妳會有一天懷念 可是我已不在」',
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
      title: 'I Really Want to Stay at Your House',
      cover: '/images/musics/cyberpunk.jpg',
      year: 2022,
      artist: 'Cyberpunk',
      rating: 9.5,
      comment: '「Cause I really wanna stay at your house」',
    },
  ],
  2021: [
    {
      title: 'Hey KONG',
      cover: '/images/musics/Hey KONG.jpg',
      year: 2019,
      artist: '刘聪KEY.L / $CC731',
      rating: 9.3,
      comment: '「hey kong, can you hear me?」',
    },
    {
      title: '想去海边',
      cover: '/images/musics/想去海边.jpg',
      year: 2020,
      artist: '夏日入侵企画',
      rating: 9.0,
      comment: '「黄昏 夕阳 还有愿望没实现」',
    },
    {
      title: '我很快乐',
      cover: '/images/musics/我很快乐.jpg',
      year: 2010,
      artist: '刘惜君',
      rating: 9.4,
      comment: '「眼泪掉不下来 我还是很快乐」',
    },
    {
      title: '国王与乞丐',
      cover: '/images/musics/国王与乞丐.jpg',
      year: 2015,
      artist: '华晨宇 / 杨宗纬',
      rating: 9.4,
      comment: '「明知往前就会坠落 抱着遗憾重返寂寞」',
    },
    {
      title: 'Strike a match',
      cover: '/images/musics/match.jpg',
      year: 2016,
      artist: 'Zayde Wølf',
      rating: 9.3,
      comment: '「I am gonna strike a match!」',
    },
  ],
  2020: [
    {
      title: 'Way Back Home',
      cover: '/images/musics/Way Back Home.jpg',
      year: 2018,
      artist: 'SHAUN / 숀',
      rating: 9.3,
      comment: '「멈춘 시간 속 잠든 너를 찾아가」',
    },
    {
      title: '华夏',
      cover: '/images/musics/华夏.jpg',
      year: 2019,
      artist: 'GAI周延',
      rating: 9.5,
      comment:
        '「尘埃岂能掩芳华，炎黄浩瀚沐苍霞。上下五千年岁月似流沙，不枉魂魄入华夏。」',
    },
    {
      title: 'Big Bang Theory Theme',
      cover: '/images/musics/Big Bang Theory Theme.jpg',
      year: 2007,
      artist: 'Barenaked Ladies',
      rating: 9.6,
      comment: '「It all started with a big bang!」',
    },
    {
      title: '疯人院',
      cover: '/images/musics/疯人院.jpg',
      year: 2020,
      artist: '华晨宇',
      rating: 9.2,
      comment: '「当我再度毁灭后，一切变更纯净」',
    },
    {
      title: '象牙舟',
      cover: '/images/musics/象牙舟.jpg',
      year: 2019,
      artist: '傻子与白痴 Fool and Idiot',
      rating: 9.6,
      comment: '「重山万岭 无论清浊都行舟」',
    },
  ],
  2019: [
    {
      title: 'Lemon',
      cover: '/images/musics/Lemon.jpg',
      year: 2018,
      artist: '米津玄師',
      rating: 9.7,
      comment:
        '「あの日の悲しみさえ あの日の苦しみさえ そのすべてを愛してた あなたとともに」',
    },
    {
      title: '小半',
      cover: '/images/musics/小半.jpg',
      year: 2016,
      artist: '陈粒',
      rating: 9.3,
      comment: '「不应该 太心软 不大胆 太死板 不果敢 玩弄着肆无忌惮」',
    },
    {
      title: '一天',
      cover: '/images/musics/一天.jpg',
      year: 2019,
      artist: '黄宣',
      rating: 9.4,
      comment: '「相遇那天 就定格了永远」',
    },
    {
      title: '张三的歌',
      cover: '/images/musics/张三的歌.jpg',
      year: 1986,
      artist: '李寿全',
      rating: 9.8,
      comment: '「虽然没有华厦美衣裳 但是心里充满着希望」',
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

// 玩过的游戏
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
    rating: 9.5,
    comment: '用开罗尔网络重新编织千万条羁绊的绳结。',
  },
]

// 关注的游戏
const upcomingGames = [
  {
    title: '侠盗猎车手6 Grand Theft Auto VI',
    cover: '/images/games/侠盗猎车手6.jpg',
    year: 2026,
    type: '游戏 / 射击 / 冒险 / 动作',
    comment: 'R门永存！',
    rating: 0, // 仅占位，不显示
  },
  {
    title: '昭和米国物语 Showa American Story',
    cover: '/images/games/昭和米国物语.jpg',
    year: 2026,
    type: '游戏 / 射击 / 角色扮演 / 冒险 / 动作',
    comment: '文化拱火概念股。',
    rating: 0,
  },
  {
    title: '双人成行 It Takes Two',
    cover: '/images/games/双人成行.jpg',
    year: 2021,
    type: '游戏 / 益智 / 冒险 / 动作',
    comment: '“双人”是游戏最大的门槛。',
    rating: 0,
  },
  {
    title: '明末：渊虚之羽 WUCHANG: Fallen Feathers',
    cover: '/images/games/渊虚之羽.jpg',
    year: 2025,
    type: '游戏 / 角色扮演 / 冒险 / 动作',
    comment: '村里第二个大学生？',
    rating: 0,
  },
  {
    title: '苏丹的游戏',
    cover: '/images/games/苏丹的游戏.jpg',
    year: 2025,
    type: '游戏 / 卡牌 / 模拟 / 角色扮演 / 策略',
    comment: '极具特色的卡牌经营游戏。',
    rating: 0,
  },
  {
    title: "博德之门3 Baldur's Gate 3",
    cover: '/images/games/博德之门3.jpg',
    year: 2023,
    type: '游戏 / 角色扮演 / 冒险 / 策略',
    comment: '「大概就是坠入爱河的感觉。」',
    rating: 0,
  },
  {
    title: '原子之心 Atomic Heart',
    cover: '/images/games/原子之心.jpg',
    year: 2023,
    type: '游戏 / 第一人称射击 / 角色扮演 / 冒险 / 动作',
    comment: '插满赤旗的未来世界。',
    rating: 0,
  },
]

function GameSection() {
  const [activeTab, setActiveTab] = useState('played')

  return (
    <div className="mb-12">
      <h2 className="mb-4 text-2xl font-bold tracking-tight text-foreground">
        All work and no play makes Jack a dull boy
      </h2>
      <div className="mb-4 flex items-center gap-2">
        <button
          className={`rounded-full border px-4 py-1 text-sm transition-colors ${
            activeTab === 'played'
              ? 'bg-primary text-primary-foreground'
              : 'bg-background text-foreground hover:bg-muted'
          }`}
          onClick={() => setActiveTab('played')}
        >
          玩过的游戏
        </button>
        <button
          className={`rounded-full border px-4 py-1 text-sm transition-colors ${
            activeTab === 'upcoming'
              ? 'bg-primary text-primary-foreground'
              : 'bg-background text-foreground hover:bg-muted'
          }`}
          onClick={() => setActiveTab('upcoming')}
        >
          还没玩的游戏
        </button>
      </div>
      <ul className="divide-y divide-muted-foreground/10">
        {(activeTab === 'played' ? games : upcomingGames).map((item, idx) => (
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
                  {item.type}
                </span>
              </div>
              <div className="mt-2 flex items-center gap-2 text-sm">
                <span className="text-xs text-muted-foreground">
                  {item.comment}
                </span>
              </div>
            </div>
            {activeTab === 'played' && (
              <div className="ml-2 flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-400" fill="#facc15" />
                <span className="font-semibold">{item.rating.toFixed(1)}</span>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

function YearSection({
  title,
  dataByYear,
  type,
}: {
  title: string
  dataByYear: Record<string, any[]>
  type: string
}) {
  // 获取所有年份并按降序排序
  const years = Object.keys(dataByYear).sort((a, b) => b.localeCompare(a))
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
        <GameSection />
      </div>
    </Container>
  )
}
