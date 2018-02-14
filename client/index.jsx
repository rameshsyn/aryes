import React from 'react'
import { render } from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import Routes from './routes'
import { store, client } from './reducers'

// Hot Reload
if (module.hot) module.hot.accept()

const Main = () => (
  <ApolloProvider client={client} store={store}>
    <Routes />
  </ApolloProvider>
)

render(<Main />, document.getElementById('app'))

