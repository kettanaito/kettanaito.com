module.exports = () => {
  const Layout = require('atomic-layout').default

  Layout.configure({
    breakpoints: {
      xs: {
        maxWidth: '575px',
      },
      sm: {
        minWidth: '576px',
        maxWidth: '768px',
      },
      md: {
        minWidth: '769px',
        maxWidth: '992px',
      },
      lg: {
        minWidth: '993px',
        maxWidth: '1199px',
      },
      xl: {
        minWidth: '1200px',
        maxWidth: '1400px',
      },
      // xxl: {
      //   minWidth: '1600px',
      // },
    },
  })
}
