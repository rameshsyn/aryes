import React, { Component } from 'react'
import { routerActions } from 'react-router-redux'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  Divider,
  Menu,
  Container,
  Dimmer,
  Loader
} from 'semantic-ui-react'

class Institution extends Component {
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
            <b onClick={() => this.props.push('/setting/institution/general')}>General</b>
          </Menu.Item>
          <Menu.Item name='category' active={activeItem === 'category'} onClick={this.handleItemClick.bind(this)}>
            <b onClick={() => this.props.push('/setting/institution/category')}>Category</b>
          </Menu.Item>
          <Menu.Item name='room' active={activeItem === 'room'} onClick={this.handleItemClick.bind(this)}>
            <b onClick={() => this.props.push('/setting/institution/room')}>Room</b>
          </Menu.Item>
          <Menu.Item name='position' active={activeItem === 'position'} onClick={this.handleItemClick.bind(this)}>
            <b onClick={() => this.props.push('/setting/institution/position')}>Position</b>
          </Menu.Item>
          <Menu.Item name='offer' active={activeItem === 'offer'} onClick={this.handleItemClick.bind(this)}>
            <b onClick={() => this.props.push('/setting/institution/offer')}>Offer</b>
          </Menu.Item>
          <Menu.Item name='expenditureTypes' active={activeItem === 'expenditureTypes'} onClick={this.handleItemClick.bind(this)}>
            <b onClick={() => this.props.push('/setting/institution/expenditure-types')}>Expenditure type</b>
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

export default connect(null, mapDipatchToProps)(Institution)
