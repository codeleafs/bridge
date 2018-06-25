/**
 * Copyright 2018-present, company, Inc
 *
 * This source code is licensed under the MIT LICENSE found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

import 'whatwg-fetch'
import qs from 'qs'

const covertformData = params => {
  return Object.keys(params).reduce((pre, key) => {
    pre.append([key], params[key])
    return pre
  }, new FormData())
}

const defaultOptions = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Cache-Control': 'no-cache'
  }
}

const TOKEN_EXPIRED = 'TOKEN_EXPIRED'

const fetcher = new class {
  /**
   * Get the default options
   */
  _options = null
  _tokenExpiredHandler = null
  _tokenRenovate = null

  constructor(options) {
    this._options = options
  }

  /**
   * Return fetch to request resource
   *
   * @param {string} url
   * @param {object} init
   * @param {function} handles
   * @returns response promise
   */
  _fetch(url, init, handle) {
    const handles = [
      res => this._refreshToken(res, { url, init }),
      handle || (res => res.json())
    ]
    return handles
      .reduce((res, handle) => res.then(handle), fetch(url, init))
      .catch(err => {
        if (err === TOKEN_EXPIRED) {
          this._tokenExpiredHandler()
        }
        throw err
      })
  }

  /**
   * Return fetch to refresh access_token by refresh_token
   *
   * @param {object} response
   * @param {object} request
   * @returns response promise
   */
  _refreshToken(response, request) {
    if (response.status !== 401) {
      return response
    }
    if (!this._tokenRenovate) {
      const options = this._attachHeaders({
        method: 'POST',
        body: qs.stringify({
          'refresh-token': window.appState.refreshToken
        })
      })
      this._tokenRenovate = fetch('/api/token/refresh', options).then(res => {
        const accessToken = res.headers.get('access-token')
        if (accessToken) {
          window.appState.setAccessToken(accessToken)
          this._tokenRenovate = null
          return accessToken
        }
        throw TOKEN_EXPIRED
      })
    }
    return this._tokenRenovate.then(accessToken => {
      const { url, init } = request
      Object.assign(init.headers, { 'access-token': accessToken })
      return fetch(url, init)
    })
  }

  /**
   * Converts data to the type specified by the 'contentType' parameter
   *
   * @param {object} data
   * @param {string} contentType
   * @returns
   */
  _getBody(data, contentType) {
    switch (contentType) {
      case 'application/x-www-form-urlencoded':
        return qs.stringify(data)
      case 'multipart/form-data':
        return covertformData(data)
      default:
        return JSON.stringify(data)
    }
  }

  /**
   *
   *
   * @param {string} url
   * @param {object} options
   * @param {function} handle
   * @returns
   */
  fetch(url, options, handle) {
    const mergeOptions = this._attachHeaders(options)
    return this._fetch(url, mergeOptions, handle)
  }

  /**
   *
   *
   * @param {string} url
   * @param {object} options
   * @param {function} handle
   * @returns
   */
  get(url, options, handle) {
    const mergeOptions = this._attachHeaders({ method: 'GET', ...options })
    return this._fetch(url, mergeOptions, handle)
  }

  /**
   *
   *
   * @param {string} url
   * @param {any} data
   * @param {object} options
   * @param {function} handle
   * @returns
   */
  post(url, data, options, handle) {
    const mergeOptions = this._attachHeaders({
      method: 'POST',
      body: null,
      ...options
    })
    mergeOptions.body = this._getBody(
      data,
      mergeOptions.headers['Content-Type']
    )
    return this._fetch(url, mergeOptions, handle)
  }

  /**
   * add intercept handler for not 2XX response
   *
   * @param {function} handler
   */
  handleTokenExpired(handler) {
    this._tokenExpiredHandler = handler
  }

  /**
   * Return options have attached headers
   *
   * @param {object} options
   */
  _attachHeaders(options = {}) {
    const headers = Object.assign(
      {
        'access-token': window.appState.accessToken
      },
      this._options.headers,
      options.headers
    )
    return { ...this._options, ...options, headers }
  }
}(defaultOptions)

export default fetcher
