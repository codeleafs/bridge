/**
 * Copyright 2018-present, company, Inc
 *
 * This source code is licensed under the MIT LICENSE found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */
const path = require('path')
const fs = require('fs')
const Jarvis = require('webpack-jarvis')
const WebpackSubresourceIntegrity = require('webpack-subresource-integrity')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)

module.exports = function override(options, env) {
  // add alias for resource reference
  Object.assign(options.resolve.alias, {
    '~': resolveApp('public')
  })

  // add loaders for origin configuration
  const cssRule = options.module.rules[1].oneOf.find(
    rule => rule.test && rule.test.source === '\\.css$'
  )
  cssRule.test = /\.css|.scss$/
  const loaders = env === 'production' ? cssRule.loader : cssRule.use
  loaders.push(
    { loader: 'sass-loader' },
    {
      loader: 'style-resources-loader',
      options: {
        patterns: [
          'src/assets/css/normalize.css',
          'src/assets/css/var.scss',
          'src/assets/css/theme.scss'
        ].map(p => resolveApp(p))
      }
    }
  )

  // add analyze tools
  if (process.env.ENV_ANALYZE) {
    options.plugins.push(
      new Jarvis({
        port: 1337,
        watchOnly: false
      })
    )
  }

  // add error report function
  if (env === 'production') {
    options.entry = {
      monitor: resolveApp('src/assets/js/monitor.js'),
      app: [options.entry[0], options.entry[1]]
    }
    options.output.crossOriginLoading = 'anonymous'
    options.plugins.push(
      new WebpackSubresourceIntegrity({
        hashFuncNames: ['sha256', 'sha384'],
        enabled: env === 'production'
      })
    )
  }

  return options
}
