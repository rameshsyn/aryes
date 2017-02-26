 /* Default Layout (Skeleton) */

import React, {Component} from 'react'
import Navbar from './navbar'
import Sidebar from './sidebar'
import { wrapper, sidebar, main } from './default.scss'

class Default extends Component {
  render () {
    return (
      <div className={wrapper}>
        <div className={sidebar}>
          <Sidebar />
        </div>
        <div className={main}>
{/*          <Navbar />
*/}          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Default
