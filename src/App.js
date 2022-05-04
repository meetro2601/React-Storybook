import React from 'react'
import store from './lib/Store'
import {Provider} from 'react-redux'
import InboxScreen from './components/InboxScreen'

function App() {
  return (
    <Provider store={store}>
      <InboxScreen/>
    </Provider>
  )
}

export default App