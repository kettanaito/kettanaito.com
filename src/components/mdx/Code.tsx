import React, { useContext } from 'react'
import styled from 'styled-components'
import { Box } from 'atomic-layout'
import { Code as ReactCdxCode } from 'react-cdx'
import LightTheme from 'prism-react-renderer/themes/github'
import DarkTheme from 'prism-react-renderer/themes/dracula'
import { ThemeContext } from '../ThemeContext'

const StyledCode = styled(ReactCdxCode)`
  border-radius: var(--border-radius);
  border: 1px solid var(--color-gray-light);
`

export const Code = ({
  children,
  language,
  className,
  showLineNumbers,
  focusedLines,
  lineNumberStart,
  ...props
}) => {
  const { themeName } = useContext(ThemeContext)
  const theme = themeName === 'dark' ? DarkTheme : LightTheme

  return (
    <Box className="code" marginHorizontalMd={-2} marginVerticalMd={2}>
      <StyledCode
        {...props}
        code={children}
        language={language || (className && className.replace('language-', ''))}
        showLineNumbers={showLineNumbers ? showLineNumbers === 'true' : true}
        focusedLines={focusedLines}
        lineNumberStart={lineNumberStart && Number(lineNumberStart)}
        theme={theme}
      />
    </Box>
  )
}
