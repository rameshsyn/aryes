
// Routes

import React from 'react'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { store } from '../reducers'
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
  Service,
  Product,
  Offer,
  Setting,
  General,
  Institution,
  Category,
  Room,
  Position,
  ExpenditureTypes,
  Admin,
  Account,
  Admins
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
      </Route>
      <Route path='/accounting' component={Accounting}>
        <Route path='/accounting/income' component={Income} />
        <Route path='/accounting/expenditure' component={Expenditure} />
      </Route>
      <Route path='/service' component={Service}>
        <Route path='/service/product' component={Product} />
      </Route>
      <Route path='/setting' component={Setting}>
        <Route path='/setting/admin' component={Admin}>
          <Route path='/setting/admin/account' component={Account} />
          <Route path='/setting/admin/admins' component={Admins} />
        </Route>
        <Route path='/setting/institution' component={Institution}>
          <Route path='/setting/institution/general' component={General} />
          <Route path='/setting/institution/category' component={Category} />
          <Route path='/setting/institution/room' component={Room} />
          <Route path='/setting/institution/position' component={Position} />
          <Route path='/setting/institution/offer' component={Offer} />
          <Route path='/setting/institution/expenditure-types' component={ExpenditureTypes} />
        </Route>
      </Route>
    </Route>
  </Router>
)

export default Routes
