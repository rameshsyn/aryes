import React, { Component } from 'react'
import {
  Input,
  Menu,
  Icon
} from 'semantic-ui-react'

class Navbar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeItem: 'sidemenu',
      sidebar: false
    }
  }
  showSidebar () {
    this.props.toggleVisibility()
    this.setState({
      sidebar: !this.state.sidebar
    })
  }
  handleItemClick (e, { name }) {
    this.setState({ activeItem: name })
  }

  render () {
    const { activeItem, sidebar } = this.state
    return (
      <Menu inverted borderless fixed='top'>
        <Menu.Item name='sidemenu' active={activeItem === 'sidemenu'} onClick={(e, ref) => {
          this.handleItemClick(e, ref)
          this.showSidebar()
        }}>
          <Icon name={sidebar ? 'delete' : 'sidebar'} />
          Menus
        </Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item>
            <Input icon='search' placeholder='Search...' />
          </Menu.Item>
          <Menu.Item name='admin' active={activeItem === 'admin'} onClick={this.handleItemClick.bind(this)}>
            Admin
          </Menu.Item>
          <Menu.Item name='logout' active={activeItem === 'logout'} onClick={this.handleItemClick.bind(this)}><Icon name='sign out' /></Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
}

export default Navbar
