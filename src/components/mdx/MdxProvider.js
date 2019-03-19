import React from 'react'
import styled from 'styled-components'
import { MDXProvider } from '@mdx-js/tag'

/* Components */
import Code from './Code'

const StyledP = styled.p`
  line-height: 1.8;
`

const createHeading = tagName => styled[tagName]`
  margin-top: 1.5em;
  margin-bottom: 0.75em;
`

const components = {
  code: Code,
  p: StyledP,
  h1: createHeading('h1'),
  h2: createHeading('h2'),
  h3: createHeading('h3'),
  h4: createHeading('h4'),
}

export default props => <MDXProvider {...props} components={components} />
