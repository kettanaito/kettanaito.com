import { GatsbySSR } from 'gatsby'
const setUpLayout = require('../../setUpLayout')

let isLayoutConfigured = false

export const onPreRenderHTML: GatsbySSR['onPreRenderHTML'] = () => {
  if (!isLayoutConfigured) {
    setUpLayout()
    isLayoutConfigured = true
  }

  return null
}
