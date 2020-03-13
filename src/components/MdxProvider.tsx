import React from 'react'
import { MDXProvider } from '@mdx-js/react'

/* Components */
import { Code } from './mdx/Code'
import { Image } from './mdx/Image'
import Link from './mdx/Link'

const components = {
  code: Code,
  a: Link,
  img: Image,
}

export const MdxProvider = (props) => (
  <MDXProvider {...props} components={components} />
)
