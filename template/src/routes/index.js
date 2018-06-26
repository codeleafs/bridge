/**
 * Copyright {{year}}-present, {{author}}, Inc
 *
 * This source code is licensed under the {{license}} LICENSEfound in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

import React from 'react'
import { Switch, Route, Redirect } from 'react-router'
import Loadable from 'react-loadable'
import loading from 'components/PageLoading'
import NoMatch from 'layouts/NoMatch'

const splitCode = ({ loader, sync, allowAnonymous, title, ...others }) => {
  // Lazy loading component
  const PageComponent = sync
    ? loader
    : Loadable({
        loader,
        loading
      })

  return {
    ...others,
    render: props => {
      if (allowAnonymous || window.appState.login) {
        document.title = title
        document.body.style.overflow = ''
        document.body.style.position = ''
        document.documentElement.scrollTop = 0
        window.scrollTo(0, 0)
        return <PageComponent {...props} />
      }
      return <Redirect to="/oauth/login" />
    }
  }
}

const route = require.context('./', true, /^\.\/[^/]+\/index.js$/)
const insetRoutes = route
  .keys()
  .reduce((routes, path) => routes.concat(route(path).default), [])
  .map(splitCode)
export default (
  <Switch>
    {insetRoutes.map(r => <Route {...r} />)}
    <Route component={NoMatch} />
  </Switch>
)
