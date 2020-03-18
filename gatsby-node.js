'use strict'

require('source-map-support').install()
require('ts-node').register({
  compilerOptions: {
    module: 'commonjs',
    target: 'ES6',
    esModuleInterop: true,
  },
})

exports.createPages = require('./gatsby/createPages').createPages
exports.onCreateNode = require('./gatsby/onCreateNode').onCreateNode
exports.createResolvers = require('./gatsby/createResolvers').createResolvers
exports.onCreateWebpackConfig = require('./gatsby/onCreateWebpackConfig').onCreateWebpackConfig
