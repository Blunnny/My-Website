// 「关于我」页面的数据图表，数据来自项目「豆瓣年轮」的输出
// 更新时直接修改下方数字即可，关键指标卡片会自动重新计算

export type RankItem = { label: string; value: number }

export type QuarterlyRow = {
  year: string
  values: [number, number, number, number]
}

export type RatingPoint = { year: string; douban: number; mine: number }

export type StatChart =
  | {
      kind: 'donut' | 'ranking'
      title: string
      unit: string
      data: RankItem[]
      // 设置后，该图表的第一名会作为关键指标展示
      highlightLabel?: string
    }
  | { kind: 'quarterly'; title: string; unit: string; data: QuarterlyRow[] }
  | { kind: 'rating'; title: string; data: RatingPoint[] }

export type StatCategory = {
  id: 'movies' | 'books' | 'games'
  label: string
  unit: string
  charts: StatChart[]
}

export const aboutStats: StatCategory[] = [
  {
    id: 'movies',
    label: '观影数据',
    unit: '部',
    charts: [
      {
        kind: 'donut',
        title: '我观影的国家/地区分布',
        unit: '部',
        data: [
          { label: '美国', value: 45 },
          { label: '日本', value: 30 },
          { label: '中国', value: 25 },
          { label: '英国', value: 20 },
          { label: '韩国', value: 15 },
        ],
      },
      {
        kind: 'donut',
        title: '我观影的类型分布',
        unit: '部',
        highlightLabel: '最爱的类型',
        data: [
          { label: '剧情', value: 50 },
          { label: '喜剧', value: 35 },
          { label: '动画', value: 30 },
          { label: '科幻', value: 25 },
          { label: '动作', value: 20 },
        ],
      },
      {
        kind: 'quarterly',
        title: '我观影的季度规律',
        unit: '部',
        data: [
          { year: '2021', values: [3, 0, 1, 26] },
          { year: '2022', values: [40, 5, 73, 13] },
          { year: '2023', values: [20, 12, 6, 19] },
          { year: '2024', values: [12, 7, 7, 12] },
          { year: '2025', values: [13, 16, 0, 0] },
        ],
      },
      {
        kind: 'rating',
        title: '影视作品的年评分趋势',
        data: [
          { year: '2021', douban: 8.230434782608695, mine: 9.391304347826088 },
          { year: '2022', douban: 8.230434782608695, mine: 8.847826086956522 },
          { year: '2023', douban: 7.562790697674418, mine: 8.093023255813954 },
          { year: '2024', douban: 7.948484848484851, mine: 9.030303030303031 },
          { year: '2025', douban: 7.980952380952382, mine: 8.380952380952381 },
        ],
      },
    ],
  },
  {
    id: 'books',
    label: '读书数据',
    unit: '本',
    charts: [
      {
        kind: 'ranking',
        title: '我最经常看的出版社',
        unit: '本',
        highlightLabel: '最常读的出版社',
        data: [
          { label: '机械工业出版社', value: 18 },
          { label: '中信出版社', value: 14 },
          { label: '人民邮电出版社', value: 12 },
          { label: '中国人民大学出版社', value: 10 },
          { label: '中信出版集团', value: 8 },
        ],
      },
      {
        kind: 'ranking',
        title: '我最经常看的作者',
        unit: '本',
        data: [
          { label: '李奇霖', value: 3 },
          { label: '黄奇帆', value: 3 },
          { label: 'Sussman', value: 2 },
          { label: 'Robin', value: 2 },
          { label: 'Williams', value: 2 },
        ],
      },
      {
        kind: 'quarterly',
        title: '我读书的季度与年份规律',
        unit: '本',
        data: [
          { year: '2021', values: [0, 0, 0, 1] },
          { year: '2022', values: [0, 9, 8, 6] },
          { year: '2023', values: [2, 23, 7, 6] },
          { year: '2024', values: [15, 49, 14, 18] },
          { year: '2025', values: [15, 16, 0, 0] },
        ],
      },
      {
        kind: 'rating',
        title: '图书的年评分趋势',
        data: [
          { year: '2022', douban: 8.379999999999999, mine: 9.6 },
          { year: '2023', douban: 8.542857142857143, mine: 8.285714285714286 },
          { year: '2024', douban: 8.741666666666665, mine: 8.666666666666666 },
          { year: '2025', douban: 8.540000000000001, mine: 9.4 },
        ],
      },
    ],
  },
  {
    id: 'games',
    label: '游戏数据',
    unit: '款',
    charts: [
      {
        kind: 'ranking',
        title: '我最常玩的游戏类型',
        unit: '款',
        highlightLabel: '最常玩的类型',
        data: [
          { label: '冒险', value: 14 },
          { label: '角色扮演', value: 11 },
          { label: '动作', value: 11 },
          { label: '射击', value: 4 },
          { label: '策略', value: 3 },
        ],
      },
      {
        kind: 'rating',
        title: '游戏的年评分趋势',
        data: [{ year: '2025', douban: 8.7, mine: 9.466666666666667 }],
      },
    ],
  },
]
