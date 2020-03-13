import React from 'react'
import styled from 'styled-components'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import PrismTheme from '../../PrismTheme'

const CodeWrapper = styled.div`
  border-radius: inherit;
  box-shadow: 0 1.6px 2px rgba(0, 0, 0, 0.05), 0 3px 4px rgba(0, 0, 0, 0.04),
    0 5.4px 7px rgba(0, 0, 0, 0.03), 0 10px 13.5px rgba(0, 0, 0, 0.03),
    0 24px 32px rgba(0, 0, 0, 0.02);
`

export const Code = ({ children, language, className, ...props }) => (
  <CodeWrapper>
    <SyntaxHighlighter
      {...props}
      language={language || (className && className.replace('language-', ''))}
      style={PrismTheme}
      showLineNumbers={true}
    >
      {children}
    </SyntaxHighlighter>
  </CodeWrapper>
)
