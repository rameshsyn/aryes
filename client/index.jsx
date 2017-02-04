import React from 'react'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import Routes from './routes'
import store from './reducers'

// Sanitize CSS - CSS Base
import '../node_modules/sanitize.css/sanitize.css'

// Hot Reload
if (module.hot) module.hot.accept()

const Main = () => (
  <Provider store={store}>
    <Routes />
  </Provider>
)

render(<Main />, document.getElementById('app'))

