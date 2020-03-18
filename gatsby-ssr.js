/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */
require('dotenv').config()
require('firebase/database')
const setUpLayout = require('./setUpLayout')

let isLayoutConfigured = false

exports.onPreRenderHTML = () => {
  if (!isLayoutConfigured) {
    setUpLayout()
    isLayoutConfigured = true
  }
}
