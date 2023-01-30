export function Container({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}): JSX.Element {
  return (
    <div
      className={['px-5 max-w-6xl mx-auto']
        .concat(className || '')
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  )
}

export function Grid({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}): JSX.Element {
  return (
    <div
      className={['grid sm:grid-cols-2 lg:grid-cols-6 gap-10 overflow-hidden']
        .concat(className || '')
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  )
}
