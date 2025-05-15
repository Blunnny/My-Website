'use client'

import { useEffect } from 'react'
import {
  Book,
  Film,
  GamepadIcon,
  BarChart3,
  TrendingUp,
  CalendarClock,
  Zap,
} from 'lucide-react'

export default function PlotlyCharts() {
  useEffect(() => {
    // 确保 Plotly 脚本只加载一次
    if (!(window as any).PlotlyConfig) {
      const script = document.createElement('script')
      script.src = 'https://cdn.plot.ly/plotly-2.35.2.min.js'
      script.async = true
      document.head.appendChild(script)
    }
  }, [])

  const chartContainerClass =
    'h-[450px] w-full rounded-lg border p-4 dark:border-zinc-700'
  const iframeClass = 'h-full w-full'

  return (
    <div className="mt-16 space-y-20">
      {/* 影视统计 - 更新为 观影数据 */}
      <section>
        <h2 className="mb-8 flex items-center gap-3 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          <Film className="h-8 w-8" />
          观影数据
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className={chartContainerClass}>
            <iframe
              src="/output_html/movies_所有影视作品_actor_top5.html"
              className={iframeClass}
              title="演员分布"
            />
          </div>
          <div className={chartContainerClass}>
            <iframe
              src="/output_html/movies_所有影视作品_director_top5.html"
              className={iframeClass}
              title="导演分布"
            />
          </div>
          <div className={chartContainerClass}>
            <iframe
              src="/output_html/movies_所有影视作品_create_time.html"
              className={iframeClass}
              title="观影时间线"
            />
          </div>
          <div className={chartContainerClass}>
            <iframe
              src="/output_html/advanced_interest_cycle_movies_monthly.html"
              className={iframeClass}
              title="电影按月份创建数量"
            />
          </div>
        </div>
      </section>

      {/* 图书统计 - 更新为 读书数据 */}
      <section>
        <h2 className="mb-8 flex items-center gap-3 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          <Book className="h-8 w-8" />
          读书数据
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className={chartContainerClass}>
            <iframe
              src="/output_html/books_所有图书_publisher_top5.html"
              className={iframeClass}
              title="出版社分布"
            />
          </div>
          <div className={chartContainerClass}>
            <iframe
              src="/output_html/books_所有图书_author_top5.html"
              className={iframeClass}
              title="作者分布"
            />
          </div>
          <div className={chartContainerClass}>
            <iframe
              src="/output_html/books_所有图书_create_time.html"
              className={iframeClass}
              title="阅读时间线"
            />
          </div>
          <div className={chartContainerClass}>
            <iframe
              src="/output_html/advanced_interest_cycle_books_monthly.html"
              className={iframeClass}
              title="图书按月份创建数量"
            />
          </div>
        </div>
      </section>

      {/* 游戏统计 - 更新为 游戏数据 */}
      <section>
        <h2 className="mb-8 flex items-center gap-3 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          <GamepadIcon className="h-8 w-8" />
          游戏数据
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className={chartContainerClass}>
            <iframe
              src="/output_html/games_所有游戏_genre_top5.html"
              className={iframeClass}
              title="游戏类型分布"
            />
          </div>
          <div className={chartContainerClass}>
            <iframe
              src="/output_html/games_所有游戏_create_time.html"
              className={iframeClass}
              title="游戏时间线"
            />
          </div>
        </div>
      </section>

      {/* 评分趋势 - 每行2个，最后一个居中 */}
      <section>
        <h3 className="mb-6 flex items-center gap-3 text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          <TrendingUp className="h-7 w-7" />
          评分趋势分析
        </h3>
        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className={chartContainerClass}>
            <iframe
              src="/output_html/advanced_rating_trends_movies.html"
              className={iframeClass}
              title="电影评分趋势"
            />
          </div>
          <div className={chartContainerClass}>
            <iframe
              src="/output_html/advanced_rating_trends_books.html"
              className={iframeClass}
              title="图书评分趋势"
            />
          </div>
          <div className="flex justify-center md:col-span-2">
            <div
              className={chartContainerClass}
              style={{ maxWidth: 'calc(50% - 1rem)' }}
            >
              <iframe
                src="/output_html/advanced_rating_trends_games.html"
                className={iframeClass}
                title="游戏评分趋势"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 其他数据 */}
      <section>
        <h2 className="mb-8 flex items-center gap-3 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          <BarChart3 className="h-8 w-8" />
          其他数据
        </h2>

        {/* 消费速度 - 单个图表居中 */}
        <div className="mb-12 flex justify-center">
          <div
            className={chartContainerClass}
            style={{ maxWidth: 'calc(50% - 1rem)' }}
          >
            <iframe
              src="/output_html/advanced_consumption_speed.html"
              className={iframeClass}
              title="平均消费速度"
            />
          </div>
        </div>
      </section>
    </div>
  )
}
