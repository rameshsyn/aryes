import React, { Component } from 'react'
import { routerActions } from 'react-router-redux'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  Divider,
  Menu,
  Segment,
  Container,
  Grid,
  Header
} from 'semantic-ui-react'

class Institution extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeItem: 'general'
    }
  }
  handleItemClick (e, { name }, path) {
    this.setState({ activeItem: name })
    this.props.push(path)
  }
  render () {
    const { activeItem } = this.state
    return (
      <Grid padded>
        <Grid.Row>
          <Container>
            <Header as='h3' textAlign='center'>
              Setting
            </Header>
          </Container>
        </Grid.Row>
        <Divider />
        <Container>
          <Menu tabular size='large' color='green'>
            <Menu.Item name='general' active={activeItem === 'general'} onClick={(e, ref) => this.handleItemClick(e, ref, '/setting/institution/general')}>
              General
            </Menu.Item>
            <Menu.Item name='category' active={activeItem === 'category'} onClick={(e, ref) => this.handleItemClick(e, ref, '/setting/institution/category')}>
              Category
            </Menu.Item>
            <Menu.Item name='room' active={activeItem === 'room'} onClick={(e, ref) => this.handleItemClick(e, ref, '/setting/institution/room')}>
              Room
            </Menu.Item>
            <Menu.Item name='position' active={activeItem === 'position'} onClick={(e, ref) => this.handleItemClick(e, ref, '/setting/institution/position')}>
              Staff Position
            </Menu.Item>
            <Menu.Item name='offer' active={activeItem === 'offer'} onClick={(e, ref) => this.handleItemClick(e, ref, '/setting/institution/offer')}>
              Offer
            </Menu.Item>
            <Menu.Item name='expenditureTypes' active={activeItem === 'expenditureTypes'} onClick={(e, ref) => this.handleItemClick(e, ref, '/setting/institution/expenditure-types')}>
              Expenditure Type
            </Menu.Item>
          </Menu>
          <Segment>
            {this.props.children}
          </Segment>
        </Container>
      </Grid>
    )
  }
}

const mapDipatchToProps = (dispatch) => bindActionCreators(routerActions, dispatch)

export default connect(null, mapDipatchToProps)(Institution)
