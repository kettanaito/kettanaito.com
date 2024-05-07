export function PostTitle({ title }: { title: string }): JSX.Element {
  return (
    <h1 className="text-4xl lg:text-6xl font-extrabold text-balance">
      {title}
    </h1>
  )
}
