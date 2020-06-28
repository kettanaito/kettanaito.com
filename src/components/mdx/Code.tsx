import React, { useContext } from 'react'
import styled from 'styled-components'
import { Box } from 'atomic-layout'
import { Code as ReactCdxCode } from 'react-cdx'
import DarkTheme from 'prism-react-renderer/themes/dracula'
import { ThemeContext } from '../ThemeContext'

const CodeWrapper = styled.div`
  box-shadow: 0 1.6px 2px rgba(0, 0, 0, 0.05), 0 3px 4px rgba(0, 0, 0, 0.04),
    0 5.4px 7px rgba(0, 0, 0, 0.03), 0 10px 13.5px rgba(0, 0, 0, 0.03),
    0 24px 32px rgba(0, 0, 0, 0.02);
`

export const Code = ({
  children,
  language,
  className,
  showLineNumbers,
  focusedLines,
  ...props
}) => {
  const { themeName } = useContext(ThemeContext)

  return (
    <Box as={CodeWrapper} className="code" marginVerticalMd={2}>
      <ReactCdxCode
        {...props}
        code={children}
        language={language || (className && className.replace('language-', ''))}
        showLineNumbers={showLineNumbers ? showLineNumbers === 'true' : true}
        focusedLines={focusedLines && focusedLines.split(',').map(Number)}
        {...(themeName === 'dark' ? { theme: DarkTheme as any } : {})}
      />
    </Box>
  )
}
