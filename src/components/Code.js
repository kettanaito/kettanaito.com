import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import PrismTheme from '../PrismTheme'

const Code = ({ children, language, className, ...props }) => (
  <SyntaxHighlighter
    {...props}
    language={language || (className && className.replace('language-', ''))}
    style={PrismTheme}
  >
    {children}
  </SyntaxHighlighter>
)

export default Code
