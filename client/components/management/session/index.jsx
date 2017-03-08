import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { routerActions } from 'react-router-redux'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import gql from 'graphql-tag'
import {
  Grid,
  Label,
  Button,
  Divider,
  Container,
  Header,
  Dimmer,
  Loader
} from 'semantic-ui-react'

class Session extends Component {
  render () {
    if (this.props.data.loading) {
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
            <Button floated='right' onClick={() => this.props.push('/management/session/new')}>New Session</Button>
          </Container>
        </Grid.Row>
        <Divider />
        <Grid.Row>
          {
            this.props.data.session.map((s, i) => {
              return <Label key={i}>{s.name}</Label>
            })
          }
        </Grid.Row>
        <Grid.Row>
          {this.props.children}
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

