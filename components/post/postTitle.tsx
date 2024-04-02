export function PostTitle({ title }: { title: string }): JSX.Element {
  return <h1 id={title} className="text-4xl lg:text-6xl font-extrabold">
    <a href={`#${title}`} className="hover:underline">{title}</a>
  </h1>
}
