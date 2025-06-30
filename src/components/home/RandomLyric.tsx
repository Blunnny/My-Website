'use client'

import React from 'react'

const lyrics = [
  '时光的河入海流 终于我们分头走',
  '如果再见不能红着眼 是否还能红着脸',
  '跟你悬崖上恋爱 其实有多精彩 全凭自欺欺骗我赢的到爱',
  '我牵着你的手经过 种麦芽糖的山坡',
  '我曾经豪情万丈 归来却空空的行囊',
  'I know I know 地球另一段有你陪我',
  '你教我自由 教我无用 不被世网牵挂',
  '我已背上一身苦困后悔与唏嘘你眼里却此刻充满泪',
  '苍天笑 纷纷世上潮 谁负谁胜出天知晓',
  '生活就像一场 繁华里的流浪',
  '等到秋叶终于金黄 等到华发悄然沧桑',
  '我想要拥有你 无比清晰的爱情',
  '为何心有灵犀 从来难长久 得见青天总在雨打风吹后',
  '看那青山 荡漾在水上 看那晚霞 吻着夕阳',
  '风吹来的砂 落在悲伤的眼里 谁都看出我在等你',
  '青春又醉倒在 籍籍无名的怀 靠嬉笑来虚度 聚散得慷慨',
  '梦倒塌的地方 今已爬满青苔',
  '唱出你的热情 伸出你的双手 让我拥抱着你的梦',
  '身在江湖或庙堂 有志在四方 风华正茂少年郎 热血永绵长', // 歌词长度不要超过这句
  '这一生一世 有多少你我 被吞没在月光如水的夜里',
  '三界 四洲 无所求 不可救',
  '听错了风 又怎么会有以后',
  '太多的伤 难诉衷肠 叹一句当时只道是寻常',
  '我想倔强我也能倔强 看你们谁能把我怎么样',
  '这一路有多远 这三世有多长 执手到地老天荒',
  '如果大海能够 唤回曾经的爱 就让我用一生等待',
  '送别的你别再等待 送别的花吹过来',
  '我想要拥有你 无比清晰的爱情',
  '爱着你 像心跳难触摸 画着你 画不出你的骨骼',
]

function getRandomLyric() {
  return lyrics[Math.floor(Math.random() * lyrics.length)]
}

const RandomLyric: React.FC = () => {
  const [lyric, setLyric] = React.useState('')
  React.useEffect(() => {
    setLyric(getRandomLyric())
  }, [])
  return (
    <div className="mt-2 select-none text-left text-lg italic text-muted-foreground">
      <span role="img" aria-label="music">
        ♫
      </span>{' '}
      {lyric}{' '}
      <span role="img" aria-label="music">
        ♫
      </span>
    </div>
  )
}

export default RandomLyric
