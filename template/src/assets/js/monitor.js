/**
 * Copyright {{year}}-present, {{author}}, Inc
 *
 * This source code is licensed under the {{license}} LICENSE found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

import reportError from './error'

/**
 * 捕获没有catch方法的Promise
 *
 * @param {any} evt
 */
function rejectHandle(evt) {
  reportError('Uncaught (in promise)', '', evt.reason)
}

/**
 * 捕获全局异常错误
 *
 * @param {any} message 错误信息（字符串)
 * @param {any} source 发生错误的脚本URL（字符串）
 * @param {any} lineno 发生错误的行号（数字）
 * @param {any} colno 发生错误的列号（数字）
 * @param {any} error Error对象（对象）
 */
function handleError(message, source, lineno, colno, error) {
  reportError(message, `${source} ${lineno}:${colno}`, error)
}

if (process.env.NODE_ENV === 'production') {
  window.addEventListener('unhandledrejection', rejectHandle)
  window.onerror = handleError
}
