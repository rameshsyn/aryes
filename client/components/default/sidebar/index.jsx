import React, { Component } from 'react'
import { routerActions } from 'react-router-redux'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  Sidebar,
  Menu,
  Icon
} from 'semantic-ui-react'

class SideMenu extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeItem: 'dashboard'
    }
  }
  handleItemClick (e, { name }, path) {
    this.setState({
      activeItem: name
    })
    this.props.push(path)
  }
  render () {
    const { activeItem } = this.state
    return (
      <Sidebar as={Menu} animation='scale down' width='thin' visible={this.props.visible} vertical inverted>
        <Menu.Item name='dashboard' active={activeItem === 'dashboard'} onClick={(e, ref) => this.handleItemClick(e, ref, '/dashboard')}>
          <Icon name='dashboard' />
          <b>Dashboard</b>
        </Menu.Item>
        <Menu.Item name='service' active={activeItem === 'service'} onClick={(e, ref) => this.handleItemClick(e, ref, '/service/product')}>
          <Icon name='cubes' />
          Service
        </Menu.Item>
        <Menu.Item>
          <Icon name='tasks' />
          Management
          <Menu.Menu>
            <Menu.Item name='student' active={activeItem === 'student'} onClick={(e, ref) => this.handleItemClick(e, ref, '/management/student')}>
              Student
            </Menu.Item>
            <Menu.Item name='session' active={activeItem === 'session'} onClick={(e, ref) => this.handleItemClick(e, ref, '/management/session')}>
              Session
            </Menu.Item>
            <Menu.Item name='staff' active={activeItem === 'staff'} onClick={(e, ref) => this.handleItemClick(e, ref, '/management/staff')}>
              Staff
            </Menu.Item>
            <Menu.Item name='inquiry' active={activeItem === 'inquiry'} onClick={(e, ref) => this.handleItemClick(e, ref, '/management/inquiry')}>
              Inquiry
            </Menu.Item>
          </Menu.Menu>
        </Menu.Item>
        <Menu.Item>
          <Icon name='pencil' />
          Accounting
          <Menu.Menu>
            <Menu.Item name='income' active={activeItem === 'income'} onClick={(e, ref) => this.handleItemClick(e, ref, '/accounting/income')}>
              Income
            </Menu.Item>
            <Menu.Item name='expenditure' active={activeItem === 'expenditure'} onClick={(e, ref) => this.handleItemClick(e, ref, '/accounting/expenditure')}>
              Expenditure
            </Menu.Item>
          </Menu.Menu>
        </Menu.Item>
        <Menu.Item>
          <Icon name='setting' />
          Setting
          <Menu.Menu>
            <Menu.Item name='admin' active={activeItem === 'admin'} onClick={(e, ref) => this.handleItemClick(e, ref, '/setting/admin')}>
              Admin
            </Menu.Item>
            <Menu.Item name='institution' active={activeItem === 'institution'} onClick={(e, ref) => this.handleItemClick(e, ref, '/setting/institution')}>
              Institution
            </Menu.Item>
          </Menu.Menu>
        </Menu.Item>
      </Sidebar>
    )
  }
}
const mapDipatchToProps = (dispatch) => bindActionCreators(routerActions, dispatch)

export default connect(null, mapDipatchToProps)(SideMenu)
