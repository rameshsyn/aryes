import React, { Component } from 'react'
import {
  Sidebar,
  Segment
} from 'semantic-ui-react'
import Navbar from './navbar'
import SideMenu from './sidebar'

class DefaultLayout extends Component {
  constructor (props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  toggleVisibility () {
    this.setState({
      visible: !this.state.visible
    })
  }

  render () {
    const { visible } = this.state
    const { children } = this.props
    return (
      <div>
        <Navbar toggleVisibility={this.toggleVisibility.bind(this)} />
        { /* Treatment for fixed navbar */ }
        <div style={{marginTop: '45px'}}>
          <Sidebar.Pushable as={Segment}>
            <SideMenu visible={visible} />
            <Sidebar.Pusher>
              <div style={{minHeight: '600px'}}>
                { children }
              </div>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </div>
      </div>
    )
  }
}

export default DefaultLayout
