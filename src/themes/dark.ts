import { mergeDeepRight } from 'ramda'
import theme from './light'

type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>
}

const colors = {
  grayDark: '#fff',
  grayDim: 'hsl(217, 10%, 15%)',
  grayGhost: 'hsl(217, 10%, 20%)',
  grayLight: 'hsl(217, 10%, 27%)',
  gray: 'hsl(217, 10%, 60%)',
}

export default mergeDeepRight<typeof theme, DeepPartial<typeof theme>>(theme, {
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
      bgColor: colors.grayDim,
      linkColor: '#fff',
    },
    code: {
      bgColor: 'rgba(255,255,255,0.03)',
      borderColor: colors.grayLight,
    },
    table: {
      borderColor: colors.grayGhost,
    },
    fieldset: {
      borderColor: colors.grayGhost,
    },
    rangeInput: {
      runnableTrackBgColor: colors.grayGhost,
    },
    gitHubRepo: {
      linkColor: '#fff',
    },
  },
})
