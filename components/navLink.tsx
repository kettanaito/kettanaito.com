import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

type ExtractLinkProps<L> = L extends React.ForwardRefExoticComponent<
  infer Props
>
  ? Props
  : never

interface Props extends ExtractLinkProps<typeof Link> {
  exact?: boolean
  activeClassName?: string
}

export function NavLink({
  exact,
  activeClassName,
  ...linkProps
}: Props): JSX.Element {
  const router = useRouter()
  const isActive = exact
    ? router.pathname === linkProps.href
    : router.pathname.startsWith(linkProps.href as string)

  return (
    <Link
      {...linkProps}
      className={[linkProps.className]
        .concat(isActive ? activeClassName : '')
        .join(' ')}
    />
  )
}
