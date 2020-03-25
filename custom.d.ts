interface SvgrComponent
  extends React.StatelessComponent<React.SVGAttributes<SVGElement>> {}

declare module '*.svg' {
  const url: string
  export const ReactComponent: SvgrComponent

  export default url
}

declare module '*.jpg' {
  const content: string
  export default content
}

import theme from './src/themes/light'

type Theme = typeof theme

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
