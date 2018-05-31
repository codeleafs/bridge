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

const fetcher = new class {
  /**
   * Get the default options
   */
  _options = null

  _tokenExpiredHandler = null

  constructor(options) {
    this._options = options
  }

  /**
   * Return fetch to request resource
   *
   * @param {string} url
   * @param {object} init
   * @param {bool} original
   * @returns fetch promise
   */
  _fetch(url, init, original = false) {
    return fetch(url, init).then(res => {
      if (original) {
        return res
      }
      if (res.status === 401) {
        return this._refreshToken(res).then(accessToken => {
          Object.assign(init.headers, { 'access-token': accessToken })
          return this._fetch(url, init)
        })
      }
      switch (res.headers.get('Content-Type')) {
        case 'application/json;charset=UTF-8':
          return res.json()
        default:
          return res.text()
      }
    })
  }

  /**
   * Return fetch to refresh access_token by refresh_token
   */
  _refreshToken() {
    const options = this._attachHeaders({
      method: 'POST',
      body: qs.stringify({
        'refresh-token': window.bridge.refreshToken
      })
    })
    return fetch('/api/getAccesstoken', options).then(res => {
      const accessToken = res.headers.get('access-token')
      if (accessToken) {
        window.bridge.setAccessToken(accessToken)
        return accessToken
      } else {
        this._tokenExpiredHandler && this._tokenExpiredHandler(res)
        return Promise.reject(
          "Can't access api to refresh token or refresh token expired"
        )
      }
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
   * @param {bool} original
   * @returns
   */
  fetch(url, options, original) {
    const mergeOptions = this._attachHeaders(options)
    return this._fetch(url, mergeOptions, original)
  }

  /**
   *
   *
   * @param {string} url
   * @param {object} options
   * @param {bool} original
   * @returns
   */
  get(url, options, original) {
    const mergeOptions = this._attachHeaders({ method: 'GET', ...options })
    return this._fetch(url, mergeOptions, original)
  }

  /**
   *
   *
   * @param {string} url
   * @param {any} data
   * @param {object} options
   * @param {bool} original
   * @returns
   */
  post(url, data, options, original) {
    const mergeOptions = this._attachHeaders({
      method: 'POST',
      body: null,
      ...options
    })
    mergeOptions.body = this._getBody(
      data,
      mergeOptions.headers['Content-Type']
    )
    return this._fetch(url, mergeOptions, original)
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
        'access-token': window.bridge.accessToken
      },
      this._options.headers,
      options.headers
    )
    return { ...this._options, ...options, headers }
  }
}(defaultOptions)

export default fetcher
