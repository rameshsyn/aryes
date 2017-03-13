import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { routerActions } from 'react-router-redux'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import gql from 'graphql-tag'
import {
  Grid,
  Menu,
  Button,
  Divider,
  Container,
  Header,
  Dimmer,
  Loader
} from 'semantic-ui-react'

class Session extends Component {
  constructor () {
    super()
    this.state = {
      activeItem: 'live'
    }
  }
  handleItemClick (e, { name }, path) {
    this.setState({ activeItem: name })
    this.props.push(path)
  }
  render () {
    const { loading } = this.props.data
    const { activeItem } = this.state
    if (loading) {
      return (
        <Dimmer active>
          <Loader size='massive'>Loading ...</Loader>
        </Dimmer>
      )
    }
    return (
      <Grid padded>
        <Grid.Row>
          <Container>
            <Header as='h3' textAlign='center'>
              Session
            </Header>
          </Container>
        </Grid.Row>
        <Divider />
        <Grid.Row>
          <Container>
            <Button floated='right'>Filter</Button>
            <Button floated='right' onClick={() => this.props.push('/management/session/new')}>New Session</Button>
          </Container>
        </Grid.Row>
        <Grid.Row>
          <Container>
            <Menu tabular size='large' color='green'>
              <Menu.Item name='live' active={activeItem === 'live'} onClick={(e, ref) => this.handleItemClick(e, ref, '/management/session/filter/live')}>
                Live
              </Menu.Item>
              <Menu.Item name='all' active={activeItem === 'all'} onClick={(e, ref) => this.handleItemClick(e, ref, '/management/session/filter/all')}>
                All
              </Menu.Item>
              <Menu.Item name='active' active={activeItem === 'active'} onClick={(e, ref) => this.handleItemClick(e, ref, '/management/session/filter/active')}>
                Active
              </Menu.Item>
              <Menu.Item name='inactive' active={activeItem === 'inactive'} onClick={(e, ref) => this.handleItemClick(e, ref, '/management/session/filter/inactive')}>
                Inactive
              </Menu.Item>
            </Menu>
            <Container>
              {this.props.children}
            </Container>
          </Container>
        </Grid.Row>
      </Grid>
    )
  }
}

const SessionQuery = gql`
  query getSessions {
    session {
      id
      name
    }
    staff {
      id
      name
    }
    room {
      id
      name
    }
  }
`

const SessionMutation = gql`
  mutation addNewSession($name: String, $instructor: String, $room: String, $timePeriod: String) {
    addNewSession(name: $name, instructor: $instructor, room: $room, timePeriod: $timePeriod) {
     id
     name
    }
  }
`

const mapDipatchToProps = (dispatch) => bindActionCreators(routerActions, dispatch)

const SessionWithData = compose(
  graphql(SessionQuery),
  graphql(SessionMutation, {
    name: 'addNewSession'
  })
)(Session)

export default connect(null, mapDipatchToProps)(SessionWithData)

