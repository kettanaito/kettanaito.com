import React from 'react'
import { MDXProvider } from '@mdx-js/tag'

/* Components */
import Code from './Code'

const components = {
  code: Code,
}

export default props => <MDXProvider {...props} components={components} />
