import * as React from 'react'
import Image, { GatsbyImageProps } from 'gatsby-image'

export function Thumbnail(props: GatsbyImageProps): JSX.Element {
  return <Image {...props} className="flex h-auto max-w-full" />
}
