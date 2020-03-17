import React from 'react'
import styled from 'styled-components'
import { Box } from 'atomic-layout'
import { Code as ReactCdxCode } from 'react-cdx'

const CodeWrapper = styled.div`
  box-shadow: 0 1.6px 2px rgba(0, 0, 0, 0.05), 0 3px 4px rgba(0, 0, 0, 0.04),
    0 5.4px 7px rgba(0, 0, 0, 0.03), 0 10px 13.5px rgba(0, 0, 0, 0.03),
    0 24px 32px rgba(0, 0, 0, 0.02);
`

export const Code = ({ children, language, className, ...props }) => (
  <Box as={CodeWrapper} marginVerticalMd={4}>
    <ReactCdxCode
      {...props}
      code={children}
      language={language || (className && className.replace('language-', ''))}
      showLineNumbers={true}
    />
  </Box>
)
