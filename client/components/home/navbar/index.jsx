import React, { Component } from 'react'
import { routerActions } from 'react-router-redux'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  Input,
  Menu,
  Icon,
  Dropdown
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
        <Menu.Item name='shortcut' active={activeItem === 'shortcut'} onClick={this.handleItemClick.bind(this)}>
          <Dropdown icon='plus'>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => this.props.push('/management/student/new')}>Student</Dropdown.Item>
              <Dropdown.Item onClick={() => this.props.push('/management/session/new')}>Session</Dropdown.Item>
              <Dropdown.Item onClick={() => this.props.push('/accounting/expenditure/new')}>Expenditure</Dropdown.Item>
              <Dropdown.Item onClick={() => this.props.push('/service/new')}>Product</Dropdown.Item>
              <Dropdown.Item onClick={() => this.props.push('/management/staff/new')}>Staff</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
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

const mapDipatchToProps = (dispatch) => bindActionCreators(routerActions, dispatch)

export default connect(null, mapDipatchToProps)(Navbar)

