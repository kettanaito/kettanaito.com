import { useMemo } from 'react'
import { formatDate } from '../../utils/date'

export function PostMeta({
  category,
  publishedAt,
}: {
  category: string
  publishedAt: string
}): JSX.Element {
  const formattedDate = useMemo(() => formatDate(publishedAt), [publishedAt])

  return (
    <div className="text-gray-500 mb-8 uppercase text-base font-medium tracking-widest font-mono">
      <a
        href={`/blog?category=${category.toLowerCase()}`}
        className="text-black hover:underline hover:text-gray-600"
      >
        {category}
      </a>
      <span className="mx-3 text-gray-300">—</span>
      <span>{formattedDate}</span>
    </div>
  )
}
