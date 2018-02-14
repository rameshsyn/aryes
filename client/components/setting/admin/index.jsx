import React, { Component } from 'react'
import { routerActions } from 'react-router-redux'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  Divider,
  Menu,
  Container,
  Segment,
  Header,
  Grid
} from 'semantic-ui-react'

class Admin extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeItem: 'account'
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
            <Menu.Item name='account' active={activeItem === 'account'} onClick={(e, ref) => this.handleItemClick(e, ref, '/setting/admin/account')}>
              Account
            </Menu.Item>
            <Menu.Item name='admins' active={activeItem === 'admins'} onClick={(e, ref) => this.handleItemClick(e, ref, '/setting/admin/admins')}>
              Admins
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

export default connect(null, mapDipatchToProps)(Admin)
