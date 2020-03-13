import mergeDeepRight from 'ramda/es/mergeDeepRight'
import DefaultTheme from 'react-syntax-highlighter/dist/cjs/styles/prism/ghcolors'

export default mergeDeepRight(DefaultTheme, {
  'code[class*="language-"]': {
    fontFamily:
      '"Source Code Pro", "Fira Mono", Consolas, Menlo, Monaco, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", "Courier New", Courier, monospace',
    fontSize: '16px',
    lineHeight: '1.45',
    direction: 'ltr',
    textAlign: 'left',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    MozTabSize: '2',
    OTabSize: '2',
    tabSize: '2',
    padding: 0,
  },
  'pre[class*="language-"]': {
    fontFamily:
      '"Source Code Pro", "Fira Mono", Consolas, Menlo, Monaco, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", "Courier New", Courier, monospace',
    fontSize: '16px',
    lineHeight: '1.375',
    direction: 'ltr',
    textAlign: 'left',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    MozTabSize: '4',
    OTabSize: '4',
    tabSize: '4',
    WebkitHyphens: 'none',
    MozHyphens: 'none',
    msHyphens: 'none',
    hyphens: 'none',
    padding: '1.5rem',
    margin: '.5em 0',
    overflow: 'auto',
    borderRadius: 3,
    borderColor: 'hsla(218, 10%, 45%, 0.24)',
  },
  comment: {
    color: '#6a737d',
  },
  prolog: {
    color: '#6c6783',
  },
  doctype: {
    color: '#6c6783',
  },
  cdata: {
    color: '#6c6783',
  },
  punctuation: {
    color: '#24292e',
  },
  namespace: {
    Opacity: '.7',
  },
  tag: {
    color: '#22863a',
  },
  operator: {
    color: '#d73a49',
  },
  number: {
    color: '#e09142',
  },
  property: {
    color: '#005cc5',
  },
  function: {
    color: '#6f42c1',
    fontWeight: '500',
  },
  'tag-id': {
    color: '#eeebff',
  },
  selector: {
    color: '#6f42c1',
  },
  'atrule-id': {
    color: '#6f42c1',
  },
  'code.language-javascript': {
    color: '#c4b9fe',
  },
  'attr-name': {
    color: '#6f42c1',
  },
  'code.language-css': {
    color: '#ffcc99',
  },
  'code.language-scss': {
    color: '#ffcc99',
  },
  boolean: {
    color: '#005cc5',
  },
  string: {
    color: '#032f62',
  },
  entity: {
    color: '#6f42c1',
    cursor: 'help',
  },
  url: {
    color: '#005cc5',
  },
  '.language-css .token.string': {
    color: '#d73a49',
  },
  '.language-scss .token.string': {
    color: '#d73a49',
  },
  '.language-bash .token': {
    color: 'red',
  },
  '.style .token.string': {
    color: '#d73a49',
  },
  'attr-value': {
    color: '#032f62',
  },
  keyword: {
    color: '#d73a49',
  },
  control: {
    color: '#ffcc99',
  },
  directive: {
    color: '#ffcc99',
  },
  unit: {
    color: '#ffcc99',
  },
  statement: {
    color: '#ffcc99',
  },
  regex: {
    color: '#005cc5',
  },
  atrule: {
    color: '#ffcc99',
  },
  placeholder: {
    color: '#ffcc99',
  },
  variable: {
    color: '#ffcc99',
  },
  deleted: {
    textDecoration: 'line-through',
  },
  inserted: {
    borderBottom: '1px dotted #eeebff',
    textDecoration: 'none',
  },
  italic: {
    fontStyle: 'italic',
  },
  important: {
    color: '#6f42c1',
  },
  bold: {
    fontWeight: '600',
  },
  'pre > code.highlight': {
    Outline: '.4em solid #8a75f5',
    OutlineOffset: '.4em',
  },
  '.line-numbers .line-numbers-rows': {
    borderRightColor: '#2c2937',
  },
  '.line-numbers-rows > span:before': {
    color: '#3c3949',
  },
  '.line-highlight': {
    background:
      'linear-gradient(to right, rgba(224, 145, 66, 0.2) 70%, rgba(224, 145, 66, 0))',
  },
})
