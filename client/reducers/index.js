import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import { browserHistory } from 'react-router'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import location from './routeLocation'

const rootReducer = combineReducers({
  location,
  routing: routerReducer
})

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(routerMiddleware(browserHistory)),

    // Redux dev tool -> Time travel
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)

if (module.hot) {
  module.hot.accept('./index', () => {
    store.replaceReducer(rootReducer())
  })
}
export default store
