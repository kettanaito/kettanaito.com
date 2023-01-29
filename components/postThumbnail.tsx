import Link from 'next/link'

interface Props {
  title: string
  category: string
  url: string
  thumbnailSvg: string
  date: Date
  className?: string
  scroll?: boolean
}

export function PostThumbnail({
  title,
  category,
  url,
  thumbnailSvg,
  date,
  className,
  scroll = false,
}: Props): JSX.Element {
  return (
    <article className={['group max-w-md'].concat(className || '').join(' ')}>
      <Link href={url} scroll={scroll}>
        <figure className="aspect-[3/4] flex items-center justify-center overflow-hidden rounded-xl from-transparent to-gray-100 bg-gradient-to-t">
          <div
            dangerouslySetInnerHTML={{ __html: thumbnailSvg }}
            className="w-48 drop-shadow-xl transition group-hover:scale-110 group-hover:drop-shadow-2xl group-hover:-translate-y-3"
          />
        </figure>
      </Link>
      <div className="mt-4">
        <p className="mb-4 lg:mb-6 text-sm font-mono text-gray-500">
          <span className="uppercase tracking-wide">{category}</span>
          <span className="mx-3 text-gray-300">—</span>
          <span>{date.toLocaleDateString('en-GB')}</span>
        </p>
        <Link href={url} className="hover:underline" scroll={scroll}>
          <p className="font-bold text-2xl">{title}</p>
        </Link>
      </div>
    </article>
  )
}
