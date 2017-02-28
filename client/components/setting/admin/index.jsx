import React, { Component } from 'react'
import { routerActions } from 'react-router-redux'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  Divider,
  Menu,
  Container
} from 'semantic-ui-react'

class Admin extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeItem: 'general'
    }
  }
  handleItemClick (e, { name }) {
    this.setState({ activeItem: name })
  }
  render () {
    const { activeItem } = this.state
    return (
      <Container>
        <Divider horizontal>Setting</Divider>
        <Menu tabular size='large' color='green'>
          <Menu.Item name='general' active={activeItem === 'general'} onClick={this.handleItemClick.bind(this)}>
            <b onClick={() => this.props.push('/setting/admin/account')}>Account</b>
          </Menu.Item>
          <Menu.Item name='category' active={activeItem === 'category'} onClick={this.handleItemClick.bind(this)}>
            <b onClick={() => this.props.push('/setting/admin/admins')}>Admins</b>
          </Menu.Item>
        </Menu>
        <Container>
          {this.props.children}
        </Container>
      </Container>
    )
  }
}

const mapDipatchToProps = (dispatch) => bindActionCreators(routerActions, dispatch)

export default connect(null, mapDipatchToProps)(Admin)
