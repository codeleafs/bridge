import { configure } from '@storybook/react'
import { setOptions } from '@storybook/addon-options'

setOptions({
  addonPanelInRight: true
})

function loadStories() {
  const req = require.context('../src/components', true, /\.stories\.js$/)
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
