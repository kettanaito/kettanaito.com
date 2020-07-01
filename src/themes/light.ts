const colors = {
  primary: 'hsl(1, 65%, 50%)',
  gray: 'hsl(217, 10%, 45%)',
  grayLight: 'hsl(217, 10%, 92%)',
  grayDim: 'hsl(240, 20%, 98%)',
  grayDark: 'hsl(0, 2%, 20%)',
  grayGhost: 'hsl(217, 31%, 93%)',
}

const utils = {
  /**
   * Converts the given HSL color into HSLA color.
   */
  alpha(hsl: string, alpha: number) {
    return hsl.replace(/\)$/, `,${alpha}$&`)
  },
}

export default {
  utils,
  colors,
  styles: {
    body: {
      bgColor: 'hsl(0, 0%, 100%)',
      color: 'hsl(0, 10%, 13%)',
    },
    main: {
      bgColor: '#fff',
    },
    header: {
      color: colors.gray,
      linkColor: colors.gray,
    },
    footer: {
      bgColor: colors.grayDim,
      linkColor: '#000',
    },
    code: {
      bgColor: 'hsla(50, 100%, 70%, 0.2)',
      borderColor: 'hsla(50, 70%, 60%, 0.4)',
    },
    table: {
      borderColor: colors.grayLight,
    },
    fieldset: {
      borderColor: colors.grayLight,
    },
    rangeInput: {
      runnableTrackBgColor: colors.grayLight,
    },
    gitHubRepo: {
      linkColor: colors.primary,
    },
  },
}
