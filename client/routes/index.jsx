import React from 'react'
import { Router, Route, browserHistory } from 'react-router'
import Home from '../components'

const Routes = () => (
  <Router history={browserHistory}>
    <Route path='/' component={Home} />
  </Router>
)

export default Routes
