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

      // 添加全局响应式配置
      script.onload = () => {
        initPlotlyResponsive()
      }
    } else {
      // 如果Plotly已加载，立即执行响应式配置
      initPlotlyResponsive()
    }

    // 创建辅助脚本，提供给所有iframe使用
    function initPlotlyResponsive() {
      // 延迟执行，确保所有iframe都已加载
      setTimeout(() => {
        const iframes = document.querySelectorAll('iframe')
        iframes.forEach((iframe) => {
          // 使用标准事件监听器而不是onload属性
          iframe.addEventListener('load', function (event) {
            const target = event.target as HTMLIFrameElement
            makeIframeResponsive(target)
          })
          // 对于已加载的iframe也执行一次
          if (iframe.contentDocument?.readyState === 'complete') {
            makeIframeResponsive(iframe)
          }
        })
      }, 500)
    }

    function makeIframeResponsive(iframe: HTMLIFrameElement) {
      try {
        const iframeDoc = iframe.contentDocument
        const iframeWin = iframe.contentWindow

        if (!iframeDoc || !iframeWin) return

        // 1. 添加viewport元标签以确保移动设备适配
        const head = iframeDoc.head
        if (!head.querySelector('meta[name="viewport"]')) {
          const meta = iframeDoc.createElement('meta')
          meta.name = 'viewport'
          meta.content =
            'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
          head.appendChild(meta)
        }

        // 2. 添加CSS以确保图表宽高自适应
        if (!head.querySelector('style[data-plotly-responsive]')) {
          const style = iframeDoc.createElement('style')
          style.setAttribute('data-plotly-responsive', 'true')
          style.textContent = `
            .plotly-graph-div {
              width: 100% !important;
              height: 100% !important;
              min-height: 400px !important;
            }
            
            body, html {
              margin: 0;
              padding: 0;
              width: 100%;
              height: 100%;
              overflow: hidden;
            }
          `
          head.appendChild(style)
        }

        // 3. 如果iframe中有Plotly，应用响应式配置
        if ((iframeWin as any).Plotly) {
          const plotlyDivs = iframeDoc.querySelectorAll('.plotly-graph-div')
          plotlyDivs.forEach((div) => {
            // 延迟处理已确保图表已完全渲染
            setTimeout(() => {
              try {
                ;(iframeWin as any).Plotly.relayout(div.id, {
                  responsive: true,
                  autosize: true,
                  config: {
                    displayModeBar: false,
                    responsive: true,
                  },
                })
              } catch (e) {
                console.error('Failed to relayout Plotly chart:', e)
              }
            }, 200)
          })

          // 4. 添加窗口大小变化监听器以重新布局图表
          iframeWin.addEventListener('resize', () => {
            plotlyDivs.forEach((div) => {
              try {
                ;(iframeWin as any).Plotly.relayout(div.id, {
                  autosize: true,
                })
              } catch (e) {
                console.error('Failed to resize Plotly chart:', e)
              }
            })
          })
        }
      } catch (e) {
        console.error('Error making iframe responsive:', e)
      }
    }

    // 5. 监听窗口大小变化，重新调整所有iframe
    const resizeHandler = () => {
      const iframes = document.querySelectorAll('iframe')
      iframes.forEach((iframe) => {
        try {
          if (iframe.contentWindow && (iframe.contentWindow as any).Plotly) {
            const plotlyDivs =
              iframe.contentDocument?.querySelectorAll('.plotly-graph-div')
            plotlyDivs?.forEach((div) => {
              ;(iframe.contentWindow as any).Plotly.relayout(div.id, {
                autosize: true,
              })
            })
          }
        } catch (e) {
          console.error('Failed to resize charts on window resize:', e)
        }
      })
    }

    window.addEventListener('resize', resizeHandler)

    // 清理函数
    return () => {
      window.removeEventListener('resize', resizeHandler)
    }
  }, [])

  const chartContainerClass =
    'h-[450px] w-full rounded-lg border p-4 dark:border-zinc-700'
  const iframeClass = 'h-full w-full border-0'

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
              scrolling="no"
              loading="lazy"
            />
          </div>
          <div className={chartContainerClass}>
            <iframe
              src="/output_html/movies_所有影视作品_director_top5.html"
              className={iframeClass}
              title="导演分布"
              scrolling="no"
              loading="lazy"
            />
          </div>
          <div className={chartContainerClass}>
            <iframe
              src="/output_html/movies_所有影视作品_create_time.html"
              className={iframeClass}
              title="观影时间线"
              scrolling="no"
              loading="lazy"
            />
          </div>
          <div className={chartContainerClass}>
            <iframe
              src="/output_html/advanced_interest_cycle_movies_monthly.html"
              className={iframeClass}
              title="电影按月份创建数量"
              scrolling="no"
              loading="lazy"
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
              scrolling="no"
              loading="lazy"
            />
          </div>
          <div className={chartContainerClass}>
            <iframe
              src="/output_html/books_所有图书_author_top5.html"
              className={iframeClass}
              title="作者分布"
              scrolling="no"
              loading="lazy"
            />
          </div>
          <div className={chartContainerClass}>
            <iframe
              src="/output_html/books_所有图书_create_time.html"
              className={iframeClass}
              title="阅读时间线"
              scrolling="no"
              loading="lazy"
            />
          </div>
          <div className={chartContainerClass}>
            <iframe
              src="/output_html/advanced_interest_cycle_books_monthly.html"
              className={iframeClass}
              title="图书按月份创建数量"
              scrolling="no"
              loading="lazy"
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
              scrolling="no"
              loading="lazy"
            />
          </div>
          <div className={chartContainerClass}>
            <iframe
              src="/output_html/games_所有游戏_create_time.html"
              className={iframeClass}
              title="游戏时间线"
              scrolling="no"
              loading="lazy"
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
              scrolling="no"
              loading="lazy"
            />
          </div>
          <div className={chartContainerClass}>
            <iframe
              src="/output_html/advanced_rating_trends_books.html"
              className={iframeClass}
              title="图书评分趋势"
              scrolling="no"
              loading="lazy"
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
                scrolling="no"
                loading="lazy"
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
              scrolling="no"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </div>
  )
}
