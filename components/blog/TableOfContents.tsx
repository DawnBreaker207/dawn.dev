'use client'
import { ChevronRight } from 'lucide-react'
import { Link } from '../ui'
import clsx from 'clsx'
import { useEffect, useState } from 'react'

type TocItem = {
  value: string
  url: string
  depth: number
}

interface TableOfContentsProps {
  toc: TocItem[]
  className?: string
}

const TableOfContents = (props: TableOfContentsProps) => {
  const { toc, className } = props
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(`#${entry.target.id}`)
        }
      })
    }

    const observer = new IntersectionObserver(handleIntersection, {
      rootMargin: '0px 0px -80% 0px',
      threshold: 0.1,
    })

    toc.forEach(({ url }) => {
      const element = document.querySelector(CSS.escape(url))

      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      toc.forEach(({ url }) => {
        const element = document.querySelector(CSS.escape(url))

        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [toc])

  return (
    <details className={clsx('space-y-4 [&_.chevron-right]:open:rotate-90', className)} open>
      <summary className="flex cursor-pointer items-center gap-1 marker:content-none">
        <ChevronRight
          size={20}
          strokeWidth={1.5}
          className="chevron-right rotate-0 transition-transform"
        />
        <span className="text-lg font-medium">Table of Contents</span>
      </summary>

      <ul className="flex flex-col space-y-2">
        {toc.map(({ value, depth, url }) => (
          <li
            key={url}
            className={clsx('text-gray-500 dark:text-gray-400', {
              'dark:text-primary-600 text-gray-200': activeId === url,
            })}
            style={{ paddingLeft: (depth - 2) * 16 }}
          >
            <Link href={url}>{value}</Link>
          </li>
        ))}
      </ul>
    </details>
  )
}

export default TableOfContents
