module.exports = {
  purge: ['./src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            strong: {
              color: 'inherit',
            },
            blockquote: {
              fontStyle: false,
              paddingLeft: '1.5em',
            },
            'blockquote :first-child': {
              marginTop: 0,
            },
            'blockquote p:first-of-type::before': false,
            'blockquote p:first-of-type::after': false,
            pre: {
              padding: '0.5rem 0',
            },
            'code::before': false,
            'code::after': false,
            table: {
              fontSize: '1rem',
            },
            ul: {
              marginLeft: 0,
            },
          },
        },
        dark: {
          code: {
            color: theme('colors.gray.200'),
          },
        },
      }),
    },
  },
  variants: {
    extend: {
      typography: ['dark'],
      boxShadow: ['active'],
      translate: ['active', 'group-hover'],
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
