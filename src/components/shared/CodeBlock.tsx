'use client'

import { useState, useRef } from 'react'
import {
  ChevronRight,
  ChevronDown,
  Copy,
  Check,
  WrapText,
} from 'lucide-react'

interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
  children?: React.ReactNode
  'data-language'?: string
  title?: string // Custom prop if passed
}

export function CodeBlock({
  children,
  className,
  title,
  ...props
}: CodeBlockProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const [isCopied, setIsCopied] = useState(false)
  const [isWrap, setIsWrap] = useState(false)
  const codeRef = useRef<HTMLPreElement>(null)

  // Extract language from className (e.g., "language-python")
  // Or from children if children is a code element with className
  let language = 'text'
  if (className?.includes('language-')) {
    language = className.replace(/.*language-/, '')
  } else if (
    children &&
    typeof children === 'object' &&
    'props' in children &&
    (children as any).props.className?.includes('language-')
  ) {
    language = (children as any).props.className.replace(/.*language-/, '')
  }

  // Capitalize first letter
  const displayLanguage =
    language === 'text'
      ? 'Code'
      : language.charAt(0).toUpperCase() + language.slice(1)

  const handleCopy = async () => {
    if (codeRef.current) {
      const codeText = codeRef.current.innerText
      try {
        await navigator.clipboard.writeText(codeText)
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 2000)
      } catch (err) {
        console.error('Failed to copy text: ', err)
      }
    }
  }

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className="group my-4 overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900">
      <div className="flex items-center justify-between border-b border-zinc-200 bg-zinc-100 px-4 py-2 dark:border-zinc-700 dark:bg-zinc-800">
        <div
          className="flex cursor-pointer items-center gap-2"
          onClick={toggleExpand}
        >
          {isExpanded ? (
            <ChevronDown className="h-4 w-4 text-zinc-500 transition-transform duration-200" />
          ) : (
            <ChevronRight className="h-4 w-4 text-zinc-500 transition-transform duration-200" />
          )}
          <span className="font-medium text-zinc-700 dark:text-zinc-200">
            {title || displayLanguage}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {/* Language Label (only visible if title is present or distinct) */}
          {title && (
            <span className="hidden text-xs text-zinc-500 sm:inline-block">
              {displayLanguage}
            </span>
          )}

          {/* Wrap Toggle */}
          <button
            onClick={() => setIsWrap(!isWrap)}
            className={`hidden rounded p-1 hover:bg-zinc-200 dark:hover:bg-zinc-700 sm:block ${
              isWrap ? 'text-primary' : 'text-zinc-500'
            }`}
            title="Toggle Word Wrap"
          >
            <WrapText className="h-4 w-4" />
          </button>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="rounded p-1 text-zinc-500 hover:bg-zinc-200 dark:hover:bg-zinc-700"
            title="Copy Code"
          >
            {isCopied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            <span className="sr-only">Copy</span>
          </button>
        </div>
      </div>

      <div
        className={`transition-all duration-300 ease-in-out ${
          isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <pre
          ref={codeRef}
          className={`${className} m-0 overflow-x-auto p-4 ${
            isWrap ? 'whitespace-pre-wrap break-all' : 'whitespace-pre'
          }`}
          style={{ margin: 0, borderRadius: 0 }} // Override prism.css styles if needed
          {...props}
        >
          {children}
        </pre>
      </div>
    </div>
  )
}
