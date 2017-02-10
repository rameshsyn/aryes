
// Routes

import React from 'react'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import store from '../reducers'
import {
  Home,
  Dashboard,
  Management,
  Accounting,
  Student,
  Session,
  Staff,
  Inquiry,
  Income,
  Expenditure,
  Room,
  Service
  } from '../components'

const Routes = () => (
  <Router history={syncHistoryWithStore(browserHistory, store)}>
    <Route path='/' component={Home}>
      <IndexRoute component={Dashboard} />
      <Route path='/dashboard' component={Dashboard} />
      <Route path='/management' component={Management}>
        <Route path='/management/student' component={Student} />
        <Route path='/management/session' component={Session} />
        <Route path='/management/staff' component={Staff} />
        <Route path='/management/inquiry' component={Inquiry} />
        <Route path='/management/room' component={Room} />
      </Route>
      <Route path='/accounting' component={Accounting}>
        <Route path='/accounting/income' component={Income} />
        <Route path='/accounting/expenditure' component={Expenditure} />
      </Route>
      <Route path='/service' component={Service} />
    </Route>
  </Router>
)

export default Routes
