import '../src/index.css'
import Layout from '../src/Layout'
import {withConsole} from'@storybook/addon-console'
import { addDecorator } from '@storybook/react'
import { initialize, mswDecorator } from 'msw-storybook-addon'

// Initialize MSW
initialize()

// Provide the MSW addon decorator globally
export const decorators = [mswDecorator]

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

addDecorator((storyFn,context)=>withConsole()(storyFn)(context))

// Global decorator for all stories
/* export const decorators = [
  Story => <Layout><Story/></Layout>
] */