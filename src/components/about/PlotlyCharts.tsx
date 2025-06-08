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
    // 动态创建iframe辅助器脚本
    const createHelperScript = () => {
      const helperScript = `
        // 移动设备检测
        function isMobileDevice() {
          return (
            typeof window.orientation !== 'undefined' || 
            navigator.userAgent.indexOf('Mobile') !== -1 ||
            navigator.userAgent.indexOf('Android') !== -1 ||
            window.innerWidth < 768
          );
        }

        // 直接修改Plotly配置和布局
        function fixPlotlyForMobile() {
          if (!window.Plotly) return;
          
          console.log("Fixing Plotly for mobile...");
          
          const plotlyDivs = document.querySelectorAll('.plotly-graph-div');
          if (!plotlyDivs.length) return;
          
          // 添加适当的移动设备元标签
          if (!document.querySelector('meta[name="viewport"]')) {
            const meta = document.createElement('meta');
            meta.name = 'viewport';
            meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
            document.head.appendChild(meta);
          }
          
          // 添加移动设备样式
          const style = document.createElement('style');
          style.textContent = \`
            body, html { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; }
            .plotly-graph-div { width: 100% !important; height: 100% !important; }
            .main-svg { width: 100% !important; height: 100% !important; }
            .svg-container { width: 100% !important; height: 100% !important; }
          \`;
          document.head.appendChild(style);
          
          // 遍历所有图表并应用移动设备调整
          plotlyDivs.forEach(div => {
            try {
              const id = div.id;
              
              // 移动设备的特殊配置
              const mobileConfig = {
                responsive: true,
                displayModeBar: false,
                scrollZoom: false,
                staticPlot: false  // 在移动设备上允许基本交互
              };
              
              // 移动设备布局调整
              const mobileLayout = {
                autosize: true,
                margin: { l: 40, r: 10, t: 10, b: 40 },
                font: { size: 10 }, // 缩小字体适应移动设备
                hovermode: 'closest',
                dragmode: 'pan'
              };
              
              // 在移动设备上应用特殊配置
              if (isMobileDevice()) {
                console.log("Applying mobile config for:", id);
                
                // 尝试获取当前图表数据
                const plotlyData = window.Plotly.d3.select('#' + id).data()[0];
                if (plotlyData && plotlyData.data) {
                  // 重新绘制图表以应用移动配置
                  window.Plotly.react(
                    id, 
                    plotlyData.data,
                    { ...plotlyData.layout, ...mobileLayout },
                    mobileConfig
                  );
                } else {
                  // 如果无法获取数据，直接应用布局
                  window.Plotly.relayout(id, mobileLayout);
                }
                
                // 确保图表填充容器
                div.style.width = '100%';
                div.style.height = '100%';
              }
            } catch (e) {
              console.error("Failed to configure Plotly chart:", e);
            }
          });
        }
        
        // 在脚本加载完成后调用
        if (document.readyState === 'complete') {
          fixPlotlyForMobile();
        } else {
          window.addEventListener('load', fixPlotlyForMobile);
        }
        
        // 监听窗口大小变化
        window.addEventListener('resize', function() {
          // 防抖动处理
          if (this._resizeTimer) clearTimeout(this._resizeTimer);
          this._resizeTimer = setTimeout(function() {
            const plotlyDivs = document.querySelectorAll('.plotly-graph-div');
            plotlyDivs.forEach(div => {
              try {
                window.Plotly.relayout(div.id, { autosize: true });
              } catch (e) {
                console.error("Error on resize:", e);
              }
            });
          }, 100);
        });
      `

      return helperScript
    }

    // 确保Plotly脚本加载并增强iframe的处理
    const enhanceIframes = () => {
      const helperScript = createHelperScript()

      // 准备修改所有iframe
      const iframes = document.querySelectorAll('iframe')
      iframes.forEach((iframe) => {
        iframe.onload = function () {
          try {
            // 尝试向iframe注入辅助脚本
            const iframeDoc =
              iframe.contentDocument || iframe.contentWindow?.document
            if (!iframeDoc) return

            // 添加移动设备viewport设置
            if (!iframeDoc.querySelector('meta[name="viewport"]')) {
              const meta = iframeDoc.createElement('meta')
              meta.name = 'viewport'
              meta.content =
                'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
              iframeDoc.head.appendChild(meta)
            }

            // 注入辅助脚本
            const scriptElem = iframeDoc.createElement('script')
            scriptElem.textContent = helperScript
            iframeDoc.body.appendChild(scriptElem)

            // 添加样式以确保内容填充完整空间
            const styleElem = iframeDoc.createElement('style')
            styleElem.textContent = `
              body, html { 
                margin: 0; 
                padding: 0; 
                width: 100%; 
                height: 100%;
                overflow: hidden; 
              }
              .plotly-graph-div { 
                width: 100% !important; 
                height: 100% !important; 
                min-height: 300px !important;
              }
              .main-svg {
                width: 100% !important;
                height: 100% !important;
              }
            `
            iframeDoc.head.appendChild(styleElem)
          } catch (e) {
            console.error('Error enhancing iframe:', e)
          }
        }

        // 对于已加载的iframe立即处理
        if (iframe.contentDocument?.readyState === 'complete') {
          if (iframe.onload) {
            iframe.onload.call(iframe, new Event('load'))
          }
        }
      })
    }

    // 主要执行逻辑
    if (typeof window !== 'undefined') {
      // 监听Plotly脚本加载
      const checkPlotlyLoaded = () => {
        if ((window as any).Plotly) {
          enhanceIframes()
          return true
        }
        return false
      }

      // 如果Plotly已加载，直接处理
      if (!checkPlotlyLoaded()) {
        // 如果未加载，添加Plotly脚本并设置加载回调
        const script = document.createElement('script')
        script.src = 'https://cdn.plot.ly/plotly-2.35.2.min.js'
        script.async = true
        script.onload = enhanceIframes
        document.head.appendChild(script)
      }

      // 监听窗口大小变化
      const resizeHandler = () => {
        const iframes = document.querySelectorAll('iframe')
        iframes.forEach((iframe) => {
          try {
            const iframeWindow = iframe.contentWindow
            if (iframeWindow && (iframeWindow as any).Plotly) {
              // 通知iframe内部调整尺寸
              iframeWindow.dispatchEvent(new Event('resize'))
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
    }
  }, [])

  // 为移动设备优化的样式
  const chartContainerClass =
    'h-[450px] w-full rounded-lg border p-4 dark:border-zinc-700 relative'
  const iframeClass = 'h-full w-full border-0 absolute inset-0 m-0 p-0'

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
              src="/output_html/movies_所有影视作品_country_top5.html"
              className={iframeClass}
              title="国家分布"
              scrolling="no"
              loading="lazy"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
            />
          </div>
          <div className={chartContainerClass}>
            <iframe
              src="/output_html/movies_所有影视作品_genre_top5.html"
              className={iframeClass}
              title="类型分布"
              scrolling="no"
              loading="lazy"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
            />
          </div>
          <div className={chartContainerClass}>
            <iframe
              src="/output_html/movies_所有影视作品_create_time.html"
              className={iframeClass}
              title="观影时间线"
              scrolling="no"
              loading="lazy"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
            />
          </div>
          <div className={chartContainerClass}>
            <iframe
              src="/output_html/advanced_rating_trends_movies.html"
              className={iframeClass}
              title="电影评分趋势"
              scrolling="no"
              loading="lazy"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
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
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
            />
          </div>
          <div className={chartContainerClass}>
            <iframe
              src="/output_html/books_所有图书_author_top5.html"
              className={iframeClass}
              title="作者分布"
              scrolling="no"
              loading="lazy"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
            />
          </div>
          <div className={chartContainerClass}>
            <iframe
              src="/output_html/books_所有图书_create_time.html"
              className={iframeClass}
              title="阅读时间线"
              scrolling="no"
              loading="lazy"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
            />
          </div>
          <div className={chartContainerClass}>
            <iframe
              src="/output_html/advanced_rating_trends_books.html"
              className={iframeClass}
              title="图书评分趋势"
              scrolling="no"
              loading="lazy"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
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
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
            />
          </div>
          <div className={chartContainerClass}>
            <iframe
              src="/output_html/advanced_rating_trends_games.html"
              className={iframeClass}
              title="游戏评分趋势"
              scrolling="no"
              loading="lazy"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
            />
          </div>
        </div>
      </section>
    </div>
  )
}
