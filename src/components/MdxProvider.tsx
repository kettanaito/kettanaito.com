import React from 'react'
import { MDXProvider } from '@mdx-js/react'

/* Components */
import { Code } from './mdx/Code'
import { Image } from './mdx/Image'
import { Hr } from './mdx/Hr'
import { Link } from './mdx/Link'

const components = {
  code: Code,
  a: Link,
  img: Image,
  hr: Hr,
  pre: ({ children }) => <>{children}</>,
}

export const MdxProvider = (props) => (
  <MDXProvider {...props} components={components} />
)
