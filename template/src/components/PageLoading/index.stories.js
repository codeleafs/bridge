/**
 * Copyright {{year}}-present, {{author}}, Inc
 *
 * This source code is licensed under the {{license}} LICENSEfound in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import PageLoading from './index.js'

storiesOf('PageLoading', module).add('default', () => <PageLoading />)