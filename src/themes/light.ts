const colors = {
  primary: '#E96A63',
  gray: 'hsl(217, 10%, 45%)',
  grayLight: 'hsl(217, 10%, 92%)',
  grayDim: '#F9F9FB',
  grayDark: '#343232',
  grayGhost: 'hsl(217, 31%, 93%)',
  grayFoo: '#737373',
}

export default {
  colors,
  styles: {
    body: {
      bgColor: '#fff',
      color: 'hsl(0, 10%, 13%)',
    },
    header: {
      color: colors.gray,
      linkColor: colors.gray,
    },
    footer: {
      linkColor: '#000',
    },
    code: {
      bgColor: 'rgba(255, 229, 100, 0.2)',
    },
  },
}
