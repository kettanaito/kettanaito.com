/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */
require('dotenv').config()
// require('firebase/database')

exports.onPreRenderHTML = require('./gatsby/gatsby-ssr/onPreRenderHTML').onPreRenderHTML
