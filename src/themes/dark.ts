import { mergeDeepRight } from 'ramda'
import lightTheme from './light'

type LightTheme = typeof lightTheme

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

export default mergeDeepRight<
  typeof lightTheme,
  {
    utils: LightTheme['utils']
    colors: DeepPartial<LightTheme['colors']>
    styles: DeepPartial<LightTheme['styles']>
  }
>(lightTheme, {
  utils: lightTheme.utils,
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
      focusedLineBgColor: 'rgba(255,255,255,0.05)',
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
