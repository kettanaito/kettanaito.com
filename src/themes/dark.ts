import { mergeDeepRight } from 'ramda'
import theme from './light'

const colors = {
  grayDark: '#fff',
  grayDim: 'hsl(217, 10%, 15%)',
  grayGhost: 'hsl(217, 10%, 20%)',
  grayLight: 'hsl(217, 10%, 27%)',
  gray: 'hsl(217, 10%, 60%)',
}

export default mergeDeepRight<typeof theme, Partial<typeof theme>>(theme, {
  colors,
  styles: {
    body: {
      bgColor: 'hsl(217, 10%, 10%)',
      color: '#ddd',
    },
    header: {
      color: colors.gray,
      linkColor: colors.gray,
    },
    footer: {
      linkColor: '#fff',
    },
    code: {
      bgColor: colors.grayLight,
    },
  },
})
