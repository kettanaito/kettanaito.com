import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'

const config = [
  ...nextCoreWebVitals,
  {
    rules: {
      '@next/next/no-img-element': 'off',
      /**
       * These rules exist to keep code compatible with React Compiler,
       * which this project doesn't use. They flag legitimate patterns
       * here (e.g. creating the MDX component in `useMemo`).
       */
      'react-hooks/refs': 'off',
      'react-hooks/static-components': 'off',
      'react-hooks/use-memo': 'off',
    },
  },
  {
    ignores: ['.next/**', 'node_modules/**', 'public/**'],
  },
]

export default config
