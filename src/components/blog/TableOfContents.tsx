'use client'

import { useEffect, useState } from 'react'
import { clsx } from 'clsx'
import { List, X } from 'lucide-react'

interface Heading {
  id: string
  text: string
  level: number
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Select all headings inside the prose content
    // We target h2, h3, h4 as per requirement (up to 4 levels usually means h1-h4 or h2-h5)
    // Assuming h1 is the title, so we look for h2, h3, h4
    const elements = Array.from(document.querySelectorAll('.prose h2, .prose h3, .prose h4'))
    const newHeadings = elements.map((elem) => ({
      id: elem.id,
      text: (elem as HTMLElement).innerText,
      level: Number(elem.tagName.substring(1)),
    }))
    setHeadings(newHeadings)
  }, [])

  if (headings.length === 0) return null

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed left-4 top-24 z-40 p-2 bg-white dark:bg-zinc-800 rounded-md shadow-md border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors print:hidden"
        aria-label="Toggle Table of Contents"
      >
        <List className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
      </button>

      {/* Overlay */}
      {isOpen && (
         <div 
           className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm dark:bg-black/40"
           onClick={() => setIsOpen(false)}
         />
      )}
      
      {/* Sidebar/Drawer */}
      <div
        className={clsx(
          'fixed left-0 top-0 h-full w-72 bg-white dark:bg-zinc-900 shadow-xl transform transition-transform duration-300 ease-in-out z-50 overflow-y-auto border-r border-zinc-200 dark:border-zinc-800',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-zinc-100 dark:border-zinc-800 sticky top-0 bg-white dark:bg-zinc-900 z-10">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">目录</h2>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5 text-zinc-500" />
          </button>
        </div>
        <nav className="p-4">
          <ul className="space-y-1">
            {headings.map((heading) => (
              <li
                key={heading.id}
                style={{ paddingLeft: `${(heading.level - 2) * 16}px` }}
              >
                <a
                  href={`#${heading.id}`}
                  className="block text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors py-1.5 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 rounded px-2 -ml-2"
                  onClick={() => setIsOpen(false)}
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  )
}
