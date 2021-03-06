
// Store -> Single Source of truth

import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { browserHistory } from 'react-router'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import location from './routeLocation'

// Apollo client
const client = new ApolloClient({

  // use desired name of apollo reducer
  reduxRootSelector: 'aryesData',
  addTypename: true,
  networkInterface: createNetworkInterface({ uri: '/graphql' }),
  dataIdFromObject: (result) => {
    if (result.id && result.__typename) {
      return result.__typename + result.id
    }
    return null
  }
})

const rootReducer = combineReducers({
  location,
  routing: routerReducer,
  aryesData: client.reducer()
})

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(routerMiddleware(browserHistory)),
    applyMiddleware(client.middleware()),

    // Redux dev tool -> Time travel
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)

// Hot Reload
if (module.hot) {
  module.hot.accept('./index', () => {
    store.replaceReducer(rootReducer())
  })
}

export {
  store,
  client
}
