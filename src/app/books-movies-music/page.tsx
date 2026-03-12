'use client'
import { useState } from 'react'
import { Container } from '@/components/layout/Container'
import Image from 'next/image'
import { Star, Eye, Info, CheckCircle } from 'lucide-react'

// 图书
const booksByYear: Record<string, any[]> = {
  2026: [
    {
      title: '量化股票组合管理',
      cover: '/images/books/量化股票组合管理.jpg',
      year: 2022,
      info: '路德维希·B.钦塞瑞尼 / 金大焕',
      publisher: '机械工业出版社',
      rating: 9.5,
      comment: '比那些Python语法占半本书的不知道强到哪里去了。',
    },
  ],
  2025: [
    {
      title: '主权个人',
      cover: '/images/books/主权个人.jpg',
      year: 1999,
      info: '詹姆斯·戴尔·戴维森、威廉·里兹',
      publisher: 'Free Press',
      rating: 9.7,
      comment: '「未来是无序的。」',
    },
    {
      title: '动物农场',
      cover: '/images/books/动物农场.jpg',
      year: 2010,
      info: '乔治·奥威尔',
      publisher: '上海译文出版社',
      rating: 9.8,
      comment: '「所有动物都是平等的，但有些动物比其他动物更平等。」',
    },
    {
      title: '估值原理',
      cover: '/images/books/估值原理.jpg',
      year: 2022,
      info: '周洛华',
      publisher: '上海财经大学出版社',
      rating: 9.5,
      comment:
        '「资产的价值并不来自其本身，而是来自它所确立的个人与其他人、与社会的关系。」',
    },
    {
      title: '太白金星有点烦',
      cover: '/images/books/太白金星有点烦.jpg',
      year: 2023,
      info: '马伯庸',
      publisher: '湖南文艺出版社',
      rating: 9.2,
      comment: '「超脱因果，不是不沾因果；太上忘情，不是无情无欲。」',
    },
    {
      title: '作者不详',
      cover: '/images/books/作者不详.jpg',
      year: 2010,
      info: '三津田信三',
      publisher: '講談社',
      rating: 8.8,
      comment: '推理+恐怖+勇敢者游戏！',
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
      comment:
        '「中国应当打好五张牌，市场是王牌，产业链是王牌中的王牌，金融是盾牌，科技是关键牌，开放是底牌。」',
    },
    {
      title: '大国大城',
      cover: '/images/books/大国大城.jpg',
      year: 2016,
      info: '陆铭',
      publisher: '上海人民出版社',
      rating: 9.3,
      comment: '「北上广深的问题不是城市太大，而是还不够大。」',
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
      comment:
        '「我不需要討好你們，因爲警察就是要站在被害者的一方，為沉默的他們作聲。」',
    },
    {
      title: '金榜题名之后',
      cover: '/images/books/金榜题名之后.jpg',
      year: 2023,
      info: '郑雅君',
      publisher: '上海三联书店',
      rating: 9.1,
      comment:
        '「这本书要为和我一样经历过文化障碍的学子而写，不能只瓦解热望而不传递勇气。」',
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
      comment: '「叙事不妨细致，结论却要看远不顾近。」',
    },
    {
      title: '激荡三十年',
      cover: '/images/books/激荡三十年.jpg',
      year: 2017,
      info: '吴晓波',
      publisher: '中信出版社',
      rating: 9.0,
      comment:
        '「历史本来就应该是对人自身的描述，它应该是可以触摸的，是可以被感知的，它充满了血肉、运动和偶然性。」',
    },
    {
      title: '诡计博物馆',
      cover: '/images/books/诡计博物馆.jpg',
      year: 2020,
      info: '[日] 大山诚一郎',
      publisher: '上海文艺出版社',
      rating: 8.5,
      comment: '「这是我所能为你做的唯一的事情了。」',
    },
    {
      title: '故事便利店',
      cover: '/images/books/故事便利店.jpg',
      year: 2022,
      info: '骆以军',
      publisher: '河南文艺出版社',
      rating: 8.3,
      comment: '「人心的细微变化都是在水波下面，在水流的深处静静地流动。」',
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
      comment:
        '「不可能的事原不会发生，因而不管表面现象如何，发生的事必然是可能的。」',
    },
    {
      title: '窗边的小豆豆',
      cover: '/images/books/窗边的小豆豆.jpg',
      year: 2003,
      info: '[日] 黑柳彻子',
      publisher: '南海出版公司',
      rating: 9.0,
      comment: '「教育不是注满一桶水，而是点燃一把火。」',
    },
    {
      title: '解忧杂货铺',
      cover: '/images/books/解忧杂货铺.jpg',
      year: 2014,
      info: '[日] 东野圭吾',
      publisher: '南海出版公司',
      rating: 9.4,
      comment: '「感谢你把这么奢侈的烦恼讲给我听。」',
    },
  ],
}

// 电影
const moviesByYear: Record<string, any[]> = {
  2026: [
    {
      title: '大空头',
      cover: '/images/movies/大空头.webp',
      year: 2015,
      info: '剧情 / 传记',
      rating: 9.6,
      comment:
        "「If we're right, people lose homes, people lose jobs, people lose pensions.」",
    },
  ],
  2025: [
    {
      title: '哪吒之魔童闹海',
      cover: '/images/movies/哪吒之魔童闹海.jpg',
      year: 2025,
      info: '剧情 / 喜剧 / 动画 / 奇幻',
      rating: 9.5,
      comment:
        '「我乃哪吒三太子，能降妖来会作诗。今日到此锄奸恶，尔等妖魔快受死。」',
    },
    {
      title: '实习生 The Intern',
      cover: '/images/movies/实习生 The Intern.webp',
      year: 2015,
      info: '喜剧',
      rating: 9.0,
      comment: "「You're never wrong to do the right thing.」",
    },
    {
      title: '老狐狸',
      cover: '/images/movies/老狐狸.webp',
      year: 2023,
      info: '剧情',
      rating: 9.0,
      comment: '「世界不会变，你只能自己换位置。」',
    },
    {
      title: '一战再战',
      cover: '/images/movies/一战再战.webp',
      year: 2025,
      info: '剧情 / 动作 / 惊悚 / 犯罪',
      rating: 9.2,
      comment:
        "「I need a weapon, man. All you've got are goddamn nunchuks here.」",
    },
    {
      title: '疯狂动物城2 Zootopia 2',
      cover: '/images/movies/疯狂动物城2.webp',
      year: 2025,
      info: '喜剧 / 动画 / 悬疑 / 犯罪 / 冒险',
      rating: 9.4,
      comment: '「别害怕与我们不同的人，那也许正是你最需要的力量。」',
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
      title: '沙丘2 Dune: Part Two',
      cover: '/images/movies/沙丘2.jpg',
      year: 2024,
      info: '剧情 / 动作 / 科幻 / 冒险',
      rating: 9.4,
      comment: '「当资源极其有限时，恐惧是我们唯一的资本。」',
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
      title: '破·地狱 破·地獄',
      cover: '/images/movies/破·地狱.jpg',
      year: 2024,
      info: '剧情 / 家庭',
      rating: 9.3,
      comment: '「其實生人都係需要破地獄嘅。」',
    },
    {
      title: '九龙城寨之围城 九龍城寨·圍城',
      cover: '/images/movies/九龙城寨之围城.webp',
      year: 2024,
      info: '动作 / 犯罪',
      rating: 9.0,
      comment: '「我頂、頂、頂、頂。」',
    },
  ],
  2023: [
    {
      title: '寻梦环游记 Coco',
      cover: '/images/movies/寻梦环游记.jpg',
      year: 2017,
      info: '喜剧 / 动画 / 音乐 / 奇幻',
      rating: 9.6,
      comment: '「死亡不是生命的终点，遗忘才是。」',
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
      title: '年会不能停！',
      cover: '/images/movies/年会不能停！.webp',
      year: 2023,
      info: '剧情 / 喜剧',
      rating: 9.2,
      comment: '「他能当领导，肯定有两把刷子。」',
    },
    {
      title: '白日之下',
      cover: '/images/movies/白日之下.webp',
      year: 2023,
      info: '剧情 / 犯罪',
      rating: 9.2,
      comment:
        '「可能真的沒人在乎，可能我們試了一千次都沒用，但說不定這次就能改變。」',
    },
    {
      title: '流浪地球2',
      cover: '/images/movies/流浪地球2.webp',
      year: 2023,
      info: '科幻 / 冒险 / 灾难',
      rating: 9.5,
      comment: '「没有人的文明毫无意义。」',
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
      title: '子弹列车 Bullet Train',
      cover: '/images/movies/子弹列车 Bullet Train.webp',
      year: 2022,
      info: '喜剧 / 动作 / 惊悚',
      rating: 9.0,
      comment: '「Who the fuck are you?」',
    },
    {
      title: '小丑 Joker',
      cover: '/images/movies/小丑 Joker.webp',
      year: 2022,
      info: '剧情 / 惊悚 / 犯罪',
      rating: 9.3,
      comment:
        "「I used to think that my life was atragedy. But now I realize, it's a comedy.」",
    },
    {
      title: '瞬息全宇宙 Everything Everywhere All at Once',
      cover: '/images/movies/瞬息全宇宙 Everything Everywhere All at Once.webp',
      year: 2022,
      info: '喜剧 / 奇幻 / 冒险',
      rating: 9.5,
      comment:
        '「I wanted to say, in another life, I would have really liked just doing laundry and taxes with you.」',
    },
    {
      title: '扬名立万',
      cover: '/images/movies/扬名立万.webp',
      year: 2021,
      info: '剧情 / 喜剧 / 悬疑',
      rating: 9.2,
      comment: '「知道这个世界上什么最可怕吗？记忆。」',
    },
  ],
  2021: [
    {
      title: '模仿游戏 The Imitation Game',
      cover: '/images/movies/模仿游戏.jpg',
      year: 2014,
      info: '剧情 / 同性 / 传记 / 战争',
      rating: 9.2,
      comment: '「有时候，正是那些你无法想象的人，成就了你无法想象的事。」',
    },
    {
      title: '遇见你之前 Me Before You',
      cover: '/images/movies/遇见你之前.webp',
      year: 2016,
      info: '剧情 / 爱情',
      rating: 9.0,
      comment: '「Live boldly. Push yourself. Don’t settle.」',
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
    {
      title: '花束般的恋爱 花束みたいな恋をした',
      cover: '/images/movies/花束般的恋爱.webp',
      year: 2021,
      info: '剧情 / 爱情',
      rating: 9.2,
      comment:
        '「立体声音乐用耳机听的话，左右耳会听到不一样的声音，如果两人各听一耳就会听到不同的歌曲。」',
    },
  ],
  2020: [
    {
      title: '华尔街之狼 The Wolf of Wall Street',
      cover: '/images/movies/华尔街之狼.webp',
      year: 2013,
      info: '剧情 / 传记 / 犯罪',
      rating: 9.3,
      comment:
        '「The art of making money is learning to receive life and enjoy it.」',
    },
    {
      title: '好小子们 Good Boys',
      cover: '/images/movies/好小子们 Good Boys.webp',
      year: 2019,
      info: '喜剧 / 儿童 / 冒险',
      rating: 9.0,
      comment:
        "「We're in sixth grade now. We need to start doing sixth-grade things.」",
    },
    {
      title: '穿条纹睡衣的男孩 The Boy in the Striped Pajamas',
      cover:
        '/images/movies/穿条纹睡衣的男孩 The Boy in the Striped Pajamas.webp',
      year: 2008,
      info: '剧情 / 战争',
      rating: 9.6,
      comment: "「We are still friends, aren't we?」",
    },
    {
      title: '蜘蛛侠：平行宇宙 Spider-Man: Into the Spider-Verse',
      cover: '/images/movies/蜘蛛侠：平行宇宙.jpg',
      year: 2018,
      info: '动作 / 科幻 / 动画 / 冒险',
      rating: 9.4,
      comment:
        '「我要怎样才能知道我准备好了？」「你不会知道，这就是一种信念。」',
    },
    {
      title: '调音师 Andhadhun',
      cover: '/images/movies/调音师.webp',
      year: 2018,
      info: '喜剧 / 悬疑 / 惊悚 / 犯罪',
      rating: 9.0,
      comment: '「What is life? It depends on the liver.」',
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
      title: '布达佩斯大饭店 The Grand Budapest Hotel',
      cover: '/images/movies/布达佩斯大饭店.jpg',
      year: 2014,
      info: '喜剧 / 剧情',
      rating: 9.5,
      comment: '「I was once considered a great beauty.」',
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
      title: '三傻大闹宝莱坞 3 Idiots',
      cover: '/images/movies/三傻大闹宝莱坞 3 Idiots.webp',
      year: 2009,
      info: '剧情 / 喜剧 / 爱情 / 歌舞',
      rating: 9.2,
      comment:
        '「盐水具有极强的导电性，初二物理知识，我们都学过，只有他会应用。」',
    },
    {
      title: '王牌特工：特工学院 Kingsman: The Secret Service',
      cover: '/images/movies/王牌特工.webp',
      year: 2014,
      info: '喜剧 / 动作 / 冒险',
      rating: 9.0,
      comment:
        "「The suit is a modern gentleman's armor, and the Kingsman agents are the new knights.」",
    },
  ],
}

// 电视剧
const tvByYear: Record<string, any[]> = {
  2026: [
    {
      title: '棋士',
      cover: '/images/drama/棋士.webp',
      year: 2025,
      info: '悬疑 / 犯罪',
      rating: 8.3,
      comment: '中国版《绝命毒师》。',
    },
  ],
  2025: [
    {
      title: '黑镜 第七季 Black Mirror Season 7',
      cover: '/images/drama/黑镜.png',
      year: 2025,
      info: '剧情 / 科幻 / 悬疑 / 惊悚 / 犯罪',
      rating: 9.5,
      comment: '「你有多少时间？」「我有的是时间。」',
    },
    {
      title: '葬送的芙莉莲 葬送のフリーレン',
      cover: '/images/drama/葬送的芙莉莲.webp',
      year: 2023,
      info: '动画 / 奇幻 / 冒险',
      rating: 9.6,
      comment: '「如果能再了解你一点就好了。」',
    },
    {
      title: '成瘾剂量 Dopesick ',
      cover: '/images/drama/成瘾剂量 Dopesick.webp',
      year: 2021,
      info: '剧情',
      rating: 9.3,
      comment: '「Pain is an inevitable part of life.」',
    },
    {
      title: '星期三 第二季 Wednesday Season 2',
      cover: '/images/drama/星期三 第二季.webp',
      year: 2025,
      info: '喜剧 / 悬疑 / 犯罪 / 奇幻',
      rating: 9.0,
      comment: '「I don’t evolve…I cocoon.」',
    },
    {
      title: '东京女子图鉴 東京女子図鑑',
      cover: '/images/drama/东京女子图鉴.webp',
      year: 2016,
      info: '剧情',
      rating: 9.2,
      comment: '「因为现在的你正是十年前的我，而现在的我正是十年后的你。」',
    },
  ],
  2024: [
    {
      title: '硅谷 Silicon Valley',
      cover: '/images/drama/硅谷.jpg',
      year: '2014-2019',
      info: '喜剧 / 剧情',
      rating: 9.8,
      comment: '「Make the world a better place!」',
    },
    {
      title: '齐木楠雄的灾难 斉木楠雄のΨ難',
      cover: '/images/drama/齐木楠雄的灾难.jpg',
      year: '2016-2019',
      info: '剧情 / 喜剧 / 动画 / 奇幻',
      rating: 9.3,
      comment: '如果做不了神，就做一个幸福的普通人吧。',
    },
    {
      title: '影后',
      cover: '/images/drama/影后.jpg',
      year: 2024,
      info: '剧情 / 喜剧',
      rating: 9.5,
      comment: '「史艾瑪你聽好，等你是個咖，才有資格掉眼淚！」',
    },
    {
      title: '追风者',
      cover: '/images/drama/追风者.webp',
      year: 2024,
      info: '剧情',
      rating: 9.2,
      comment:
        '「你们所看到的贫瘠土地，只要给予时间和耐心，一定会长成足以支撑世界的经济良田。」',
    },
    {
      title: '长安十二时辰',
      cover: '/images/drama/长安十二时辰.webp',
      year: 2019,
      info: '剧情 / 悬疑 / 古装',
      rating: 9.0,
      comment: '「世人只知巨龙之怒，伏尸百万，却不知蚍蜉之怒，也能摧城撼树。」',
    },
  ],
  2023: [
    {
      title: '生活大爆炸 The Big Bang Theory',
      cover: '/images/drama/生活大爆炸.jpg',
      year: '2007-2018',
      info: '喜剧 / 爱情',
      rating: 9.9,
      comment: "「If you weren't my friend, there'd be a hole in my life.」",
    },
    {
      title: '中国奇谭',
      cover: '/images/drama/中国奇谭.webp',
      year: 2023,
      info: '动画 / 短片 / 奇幻',
      rating: 9.4,
      comment: '「送货郎，你丢的究竟是鹅，还是那心上人？」',
    },
    {
      title: '三体',
      cover: '/images/drama/三体.webp',
      year: 2023,
      info: '剧情 / 科幻',
      rating: 9.3,
      comment: '「不要回答！」',
    },
    {
      title: '漫长的季节',
      cover: '/images/drama/漫长的季节.webp',
      year: 2023,
      info: '剧情 / 家庭 / 犯罪',
      rating: 9.4,
      comment: '「往前走，别回头。」',
    },
    {
      title: '旺达幻视 WandaVision',
      cover: '/images/drama/旺达幻视.webp',
      year: 2021,
      info: '剧情 / 科幻',
      rating: 9.2,
      comment: '「But what is grief, if not love persevering?」',
    },
  ],
  2022: [
    {
      title: 'JOJO的奇妙冒险 ジョジョの奇妙な冒険',
      cover: '/images/drama/JOJO的奇妙冒险.webp',
      year: '2012 - 2021',
      info: '剧情 / 动作 / 动画 / 冒险',
      rating: 9.8,
      comment: '「这是替身攻击！」',
    },
    {
      title: '赛博朋克：边缘行者 Cyberpunk: Edgerunners',
      cover: '/images/drama/赛博朋克.webp',
      year: 2022,
      info: '动作 / 科幻 / 动画 / 惊悚 / 犯罪 / 冒险',
      rating: 9.5,
      comment: '「子弹杯里兑伏特加加冰，兑小可可乐，生的伟大，死的光荣。」',
    },
    {
      title: '星期三 Wednesday',
      cover: '/images/drama/星期三.jpg',
      year: 2022,
      info: '喜剧 / 悬疑 / 犯罪 / 奇幻',
      rating: 9.3,
      comment: '「我宁愿孤独，也不愿和那些人为伍。」',
    },
    {
      title: '斯巴达克斯：血与沙 Spartacus: Blood and Sand',
      cover: '/images/drama/斯巴达克斯.webp',
      year: '2010',
      info: '剧情 / 动作 / 传记 / 历史 / 冒险',
      rating: 9.0,
      comment:
        '「罗马人教会我一件事——当被锁链束缚时，唯一能打破枷锁的，是更强大的锁链！」',
    },
    {
      title: "后翼弃兵 The Queen's Gambit",
      cover: '/images/drama/后翼弃兵.webp',
      year: '2020',
      info: '剧情',
      rating: 9.4,
      comment:
        '「Anger is a potent spice. A pinch wakes you up; too much dulls your senses.」',
    },
  ],
  2021: [
    {
      title: '英雄联盟：双城之战 第一季 Arcane Season 1',
      cover: '/images/drama/英雄联盟：双城之战.webp',
      year: 2021,
      info: '动作 / 科幻 / 动画 / 冒险',
      rating: 9.3,
      comment: '「JINX means jinx!」',
    },
    {
      title: '隐秘的角落',
      cover: '/images/drama/隐秘的角落.webp',
      year: 2020,
      info: '剧情 / 悬疑 / 犯罪',
      rating: 9.5,
      comment: '「您看我还有机会吗？」',
    },
    {
      title: '穿越火线',
      cover: '/images/drama/穿越火线.webp',
      year: 2020,
      info: '剧情 / 奇幻',
      rating: 9.0,
      comment: '「谢谢你的告诉我，我会坚持下去的。」',
    },
    {
      title: '大楼里只有谋杀 第一季 Only Murders in the Building Season 1',
      cover: '/images/drama/大楼里只有谋杀.webp',
      year: 2021,
      info: '喜剧 / 悬疑 / 犯罪',
      rating: 9.2,
      comment: "「Real life doesn't always resolve like mysteries do.」",
    },
    {
      title: '奇巧计程车 オッドタクシー',
      cover: '/images/drama/奇巧计程车.webp',
      year: 2021,
      info: '剧情 / 动画 / 悬疑',
      rating: 9.5,
      comment: '「后视镜里的世界，永远比挡风玻璃前的更清晰。」',
    },
  ],
  2020: [
    {
      title: '鬼灭之刃 鬼滅の刃',
      cover: '/images/drama/鬼灭之刃.jpg',
      year: 2019,
      info: '动画 / 奇幻',
      rating: 9.6,
      comment: '「老去或是死亡，都是人类短暂生命的美妙之处。」',
    },

    {
      title: '权力的游戏 Game of Thrones',
      cover: '/images/drama/权力的游戏.webp',
      year: '2011-2019',
      info: '剧情 / 奇幻 / 冒险',
      rating: 9.4,
      comment: '重拍第八季！',
    },
    {
      title: '摩天大楼',
      cover: '/images/drama/摩天大楼.webp',
      year: '2020',
      info: '悬疑 / 犯罪',
      rating: 8.7,
      comment: '「如果自杀那一天，有人告诉她有另外一种可能该有多好。」',
    },
    {
      title: '四月是你的谎言 四月は君の嘘',
      cover: '/images/drama/四月是你的谎言.jpg',
      year: '2014',
      info: '剧情 / 动画 / 音乐',
      rating: 9.5,
      comment:
        '「春天，马上就要来了。让我与你相遇的春天，就要来了。再也没有你的春天，就要来了。」',
    },
    {
      title: '弥留之国的爱丽丝 第一季 今際の国のアリス',
      cover: '/images/drama/弥留之国的爱丽丝.webp',
      year: '2020',
      info: '动作 / 科幻 / 悬疑 / 惊悚 / 奇幻',
      rating: 9.2,
      comment:
        '「我们活着这件事，并不仅仅是在维持生命而已。我们都是那些曾经存在过的人的“存在证明”。」',
    },
  ],
  2019: [
    {
      title: '加勒比海盗系列 Pirates of the Caribbean',
      cover: '/images/drama/加勒比海盗.webp',
      year: '2003-2017',
      info: '动作 / 冒险 / 奇幻 / 剧情',
      rating: 9.3,
      comment: '「Dying is the day worth living for!」',
    },

    {
      title: '想见你 想見你',
      cover: '/images/drama/想见你.webp',
      year: 2019,
      info: '爱情 / 悬疑 / 奇幻',
      rating: 9.5,
      comment: '「想见你 只想见你 未来过去 我只想见你」',
    },
    {
      title: '非自然死亡 アンナチュラル',
      cover: '/images/drama/非自然死亡.webp',
      year: 2018,
      info: '剧情 / 悬疑',
      rating: 9.6,
      comment: '「医学是为未来而生的工作。」',
    },
    {
      title: '爱，死亡和机器人 第一季 Love, Death & Robots Season 1',
      cover: '/images/drama/爱，死亡和机器人.webp',
      year: 2019,
      info: '喜剧 / 科幻 / 动画  / 奇幻',
      rating: 9.7,
      comment: "「My search for truth is finished at last. I'm going home.」",
    },
    {
      title: '武林外传',
      cover: '/images/drama/武林外传.webp',
      year: 2006,
      info: '喜剧 / 武侠 / 古装',
      rating: 9.7,
      comment: '「世界如此美好，我却如此暴躁，这样不好，不好！」',
    },
  ],
}

// 音乐
const musicsByYear: Record<string, any[]> = {
  2026: [
    {
      title: '恩赐',
      cover: '/images/musics/恩赐.jpg',
      year: 2021,
      artist: '乐游记乐队',
      rating: 9.4,
      comment: '「也許荊棘路途經已 相信世界定有天意」',
    },
    {
      title: '笔记',
      cover: '/images/musics/笔记.jpg',
      year: 2005,
      artist: '周笔畅',
      rating: 9.2,
      comment: '「载着我的思念 飞过来地平线 你温暖的笑脸还一如从前」',
    },
    {
      title: '燕儿归',
      cover: '/images/musics/燕儿归.jpg',
      year: 2018,
      artist: '牛奶咖啡',
      rating: 9.0,
      comment: '「走过路 又走过桥 醒来海上摇啊摇」',
    },
    {
      title: '假装',
      cover: '/images/musics/假装.jpg',
      year: 2021,
      artist: '刘大壮',
      rating: 8.8,
      comment: '「假装爱还没走掉 假装你还对我好」',
    },
  ],
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
      title: '遇',
      cover: '/images/musics/遇.jpg',
      year: 2004,
      artist: 'ai.mini',
      rating: 9.0,
      comment: '「都怪雨下的那么急 都怪没有地方躲雨」',
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

// 玩过的游戏 - 按玩法分类
const gamesByType = {
  '3A大作': [
    {
      title: '侠盗猎车手5 Grand Theft Auto V',
      cover: '/images/games/GTA5.jpg',
      year: 2015,
      type: '角色扮演 / 冒险 / 动作 / 开放世界',
      rating: 10.0,
      comment: 'GTA6不要跳票了😭',
    },
    {
      title: '荒野大镖客：救赎2 Red Dead Redemption 2',
      cover: '/images/games/荒野大镖客：救赎2 Red Dead Redemption 2.jpg',
      year: 2018,
      type: '游戏 / 射击 / 冒险 / 动作',
      rating: 9.9,
      comment: '「I had a GOD DAMN PLAN!」',
    },
    {
      title: '黑神话·悟空',
      cover: '/images/games/黑神话·悟空.jpg',
      year: 2024,
      type: '游戏 / 角色扮演 / 冒险 / 动作',
      rating: 9.7,
      comment: '「这一回，我又赢了，金蝉子。」',
    },
    {
      title: '热血无赖 Sleeping Dogs',
      cover: '/images/games/热血无赖 Sleeping Dogs.jpg',
      year: 2012,
      type: '游戏 / 射击 / 冒险 / 动作',
      rating: 9.2,
      comment: '「A man who never eats pork buns, is never a whole man!」',
    },
    {
      title: '战神4 God of War',
      cover: '/images/games/战神4 God of War.jpg',
      year: 2018,
      type: '游戏 / 角色扮演 / 冒险 / 动作',
      rating: 9.7,
      comment: '「不要把我的沉默误解为我没有悲伤。」',
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
      rating: 9.7,
      comment:
        '「你是愿意当个无名之辈，一辈子安生？还是就算活不到三十岁，也要名留青史呢？」',
    },
    {
      title: '死亡搁浅 DEATH STRANDING',
      cover: '/images/games/死亡搁浅 DEATH STRANDING.jpg',
      year: 2019,
      type: '游戏 / 冒险 / 动作',
      rating: 9.5,
      comment: '「Keep on keeping on.」',
    },
  ],
  射击类: [
    {
      title: '无主之地3 Borderlands 3',
      cover: '/images/games/无主之地3 Borderlands 3.jpg',
      year: 2019,
      type: '游戏 / 第一人称射击 / 角色扮演 / 冒险 / 动作',
      rating: 9.0,
      comment: '「My chili recipe...dies...with me.」',
    },
    {
      title: '逃离鸭科夫 Escape from Tarkov',
      cover: '/images/games/逃离鸭科夫.jpg',
      year: 2025,
      type: '游戏 / 第一人称射击 / 战术 / 提取射击',
      rating: 8.7,
      comment: '解压搜打撤',
    },
    {
      title: '穿越火线（已云）',
      cover: '/images/games/穿越火线.jpg',
      year: 2012,
      type: '游戏 / FPS ',
      rating: 8.0,
      comment: '十年老兵🫡',
    },
  ],
  卡牌类: [
    {
      title: '杀戮尖塔 Slay the Spire',
      cover: '/images/games/杀戮尖塔 Slay the Spire.jpg',
      year: 2019,
      type: '游戏 / 卡牌 / 角色扮演 / 策略',
      rating: 9.2,
      comment: '「🤖:至少也要见到第一个boss吧」',
    },
    {
      title: '炉石传说（已退坑）',
      cover: '/images/games/炉石传说.jpg',
      year: 2017,
      type: '游戏 / 卡牌 ',
      rating: 8.5,
      comment: '我至今依然记得一包开出女王和螺丝的那一天。',
    },
  ],
  互动影游: [
    {
      title: '隐形守护者',
      cover: '/images/games/隐形守护者.jpg',
      year: 2019,
      type: '游戏 / 文字冒险',
      rating: 9.6,
      comment: '「初看愿做旁观者，转眼已是局中人」',
    },
    {
      title: '超英派遣中心 Dispatch',
      cover: '/images/games/Dispatch.jpg',
      year: 2025,
      type: '游戏 / 益智 / 冒险 / 策略 / 动作',
      rating: 8.8,
      comment: '「They look fucking identical, Robert!」',
    },
    {
      title: '完蛋！我被美女包围了！',
      cover: '/images/games/完蛋.jpg',
      year: 2023,
      type: '游戏 / 文字冒险',
      rating: 8.0,
      comment: '开创互动影游新赛道',
    },
    {
      title: '情感反诈模拟器',
      cover: '/images/games/情感反诈模拟器.jpg',
      year: 2025,
      type: '游戏 / 文字冒险',
      rating: 8.2,
      comment: '已经被《可不可以》腌入味了',
    },
  ],
}

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
    comment: '双人是游戏最大的门槛。',
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
  {
    title: '极乐迪斯科 Disco Elysium',
    cover: '/images/games/极乐迪斯科 Disco Elysium.jpg',
    year: 2019,
    type: '游戏 / 角色扮演',
    comment: 'CRPG的文艺复兴与后社会主义的百年孤独。',
    rating: 0,
  },
]

function GameSection() {
  const [activeTab, setActiveTab] = useState('played')
  const [activeGameType, setActiveGameType] = useState(
    Object.keys(gamesByType)[0],
  )

  // 获取当前要显示的游戏列表
  const getCurrentGames = () => {
    if (activeTab === 'played') {
      return gamesByType[activeGameType as keyof typeof gamesByType] || []
    }
    return upcomingGames
  }

  const currentGames =
    activeTab === 'played'
      ? [...getCurrentGames()].sort((a, b) => b.rating - a.rating)
      : getCurrentGames()

  return (
    <div className="mb-12">
      <div className="mb-4 flex items-baseline gap-3">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          游戏
        </h2>
        <span className="text-base font-medium text-muted-foreground">
          All work and no play makes Jack a dull boy
        </span>
      </div>

      {/* 主分类按钮 */}
      <div className="mb-4 flex items-center gap-2">
        <button
          className={`rounded-full border px-4 py-1 text-sm transition-all duration-300 ease-in-out ${
            activeTab === 'played'
              ? 'transform-none bg-primary text-primary-foreground shadow-none'
              : 'bg-background text-foreground shadow-none hover:-translate-x-0.5 hover:-translate-y-1 hover:transform hover:bg-muted hover:shadow-[2px_5px_0_0_black] active:translate-x-0.5 active:translate-y-0.5 active:transform active:shadow-none dark:hover:shadow-[2px_5px_0_0_white]'
          }`}
          onClick={() => setActiveTab('played')}
        >
          玩过的游戏
        </button>
        <button
          className={`rounded-full border px-4 py-1 text-sm transition-all duration-300 ease-in-out ${
            activeTab === 'upcoming'
              ? 'transform-none bg-primary text-primary-foreground shadow-none'
              : 'bg-background text-foreground shadow-none hover:-translate-x-0.5 hover:-translate-y-1 hover:transform hover:bg-muted hover:shadow-[2px_5px_0_0_black] active:translate-x-0.5 active:translate-y-0.5 active:transform active:shadow-none dark:hover:shadow-[2px_5px_0_0_white]'
          }`}
          onClick={() => setActiveTab('upcoming')}
        >
          还没玩的游戏
        </button>
      </div>

      {/* 二级分类按钮 - 只在"玩过的游戏"时显示 */}
      {activeTab === 'played' && (
        <div className="mb-4 flex items-center gap-2">
          {Object.keys(gamesByType).map((gameType) => (
            <button
              key={gameType}
              className={`rounded-full border px-4 py-1 text-sm transition-all duration-300 ease-in-out ${
                activeGameType === gameType
                  ? 'transform-none bg-pink-400 text-white shadow-none'
                  : 'bg-background text-foreground shadow-none hover:-translate-x-0.5 hover:-translate-y-1 hover:transform hover:bg-muted hover:shadow-[2px_5px_0_0_black] active:translate-x-0.5 active:translate-y-0.5 active:transform active:shadow-none dark:hover:shadow-[2px_5px_0_0_white]'
              }`}
              onClick={() => setActiveGameType(gameType)}
            >
              {gameType}
            </button>
          ))}
        </div>
      )}

      <ul className="divide-y divide-muted-foreground/10">
        {currentGames.map((item, idx) => {
          const fileName = item.cover.toString().split('/').pop() ?? ''
          const coverSrc =
            activeTab === 'played'
              ? `/images/games/played/${activeGameType}/${fileName}`
              : `/images/games/upcoming/${fileName}`
          return (
            <li key={item.title} className="flex items-center gap-4 py-4">
              <div className="relative h-20 w-14 flex-shrink-0 overflow-hidden rounded-md shadow">
                <Image
                  src={coverSrc}
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
                  <span className="font-semibold">
                    {item.rating.toFixed(1)}
                  </span>
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function YearSection({
  title,
  subtitle,
  dataByYear,
  type,
}: {
  title: string
  subtitle?: string
  dataByYear: Record<string, any[]>
  type: string
}) {
  // 获取所有年份并按降序排序
  const years = Object.keys(dataByYear).sort((a, b) => b.localeCompare(a))
  const [year, setYear] = useState(years[0])
  return (
    <div className="mb-12">
      <div className="mb-2 flex items-baseline gap-3">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          {title}
        </h2>
        {subtitle && (
          <span className="text-base font-medium text-muted-foreground">
            {subtitle}
          </span>
        )}
      </div>
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
          .map((item, idx) => {
            const fileName = item.cover.toString().split('/').pop() ?? ''
            let coverSrc = item.cover
            if (type === 'book') {
              coverSrc = `/images/books/${year}/${fileName}`
            } else if (type === 'tv') {
              coverSrc = `/images/drama/${year}/${fileName}`
            } else if (type === 'movie') {
              coverSrc = `/images/movies/${year}/${fileName}`
            } else if (type === 'music') {
              coverSrc = `/images/musics/${year}/${fileName}`
            }
            return (
              <li key={item.title} className="flex items-center gap-4 py-4">
                <div className="relative h-20 w-14 flex-shrink-0 overflow-hidden rounded-md shadow">
                  <Image
                    src={coverSrc}
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
                  <span className="font-semibold">
                    {item.rating.toFixed(1)}
                  </span>
                </div>
              </li>
            )
          })}
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
          title="图书"
          subtitle="字里行间，卧游千山"
          dataByYear={booksByYear}
          type="book"
        />
        <YearSection
          title="电影"
          subtitle="二十四帧人间世"
          dataByYear={moviesByYear}
          type="movie"
        />
        <YearSection
          title="电视剧"
          subtitle="第二人生"
          dataByYear={tvByYear}
          type="tv"
        />
        <YearSection
          title="音乐"
          subtitle="单曲循环！"
          dataByYear={musicsByYear}
          type="music"
        />
        <GameSection />
      </div>
    </Container>
  )
}
