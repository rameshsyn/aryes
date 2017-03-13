import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { routerActions } from 'react-router-redux'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import gql from 'graphql-tag'
import {
  Card,
  Dimmer,
  Loader,
  Icon,
  Modal,
  Button,
  Segment
} from 'semantic-ui-react'
import moment from 'moment'

class Session extends Component {
  constructor () {
    super()
    this.state = {
      confirm: false,
      sessionId: ''
    }
  }
  displaySessions () {
    const { session } = this.props.data
    return session.map((s, i) => {
      return (
        <Card key={i} color={s.active ? 'green' : 'yellow'}>
          <Card.Content>
            <Card.Header onClick={() => this.props.push(`/session/${s.id}`)} style={{cursor: 'pointer'}}>
              {s.name}
            </Card.Header>
            <Card.Meta>
              Time: {s.timePeriod}
            </Card.Meta>
            <Card.Description>
              <b>Instructor: </b> {s.instructor.name} <br />
              <b>Room: </b> {s.room.name} <br />
              <b>Service: {s.product.name}</b>
            </Card.Description>
          </Card.Content>
          <Card.Content>
            <Icon name='edit' color='green' circular link onClick={this.handleEditClick.bind(this, s.id)} />
            <Icon name='delete' color='red' circular link onClick={this.handleDeleteClick.bind(this, s.id)} />
          </Card.Content>
        </Card>
      )
    })
  }
  handleEditClick (id) {
    this.props.push(`/management/session/update/${id}`)
  }
  handleDeleteClick (id) {
    this.setState({
      confirm: true,
      sessionId: id
    })
  }
  handleConfirm () {
    const { deleteSession } = this.props
    deleteSession({
      variables: {
        id: this.state.sessionId
      }
    })
    .then(({ data }) => {
      // Refetches all the products
      // to keep Apollo Global cache consistent
      this.props.data.refetch()
      console.log(data)
    })
    .catch((error) => {
      console.log(error)
    })
    this.setState({
      confirm: false
    })
  }
  handleCancel () {
    this.setState({
      confirm: false
    })
  }
  render () {
    const { loading } = this.props.data
    const { confirm } = this.state
    if (loading) {
      return (
        <Dimmer active>
          <Loader size='massive'>Loading ...</Loader>
        </Dimmer>
      )
    }
    return (
      <div>
        <Modal open={confirm} basic size='small'>
          <Modal.Header>
            <h1 style={{textAlign: 'center'}}>Are you sure want to remove ?</h1>
          </Modal.Header>
          <Modal.Actions>
            <Button basic color='green' inverted onClick={this.handleCancel.bind(this)}>
              <Icon name='remove' /> No
            </Button>
            <Button color='red' inverted onClick={this.handleConfirm.bind(this)}>
              <Icon name='checkmark' /> Yes
            </Button>
          </Modal.Actions>
        </Modal>
        <Segment loading={loading}>
          <Card.Group itemsPerRow={3}>
            {this.displaySessions()}
          </Card.Group>
        </Segment>
      </div>
    )
  }
}

const SessionQuery = gql`
  query getSessions {
    session {
      id
      name
      timePeriod
      active
      product {
        id
        name
      }
      instructor {
        id
        name
      }
      room {
        id
        name
      }
    }
  }
`
const SessionMutation = gql`
  mutation deleteSession($id: String!) {
    deleteSession(id: $id) {
      id
    }
  }
`
// Generates a current time period for live sessions
const now = () => {
  // Current hour
  const hr = moment().format('hA')
  // An hour later from now
  const anHrLater = moment().add(1, 'h').format('hA')
  // Format
  return `${hr}-${anHrLater}`
}
const parseRouteParams = (params) => {
  const type = params.type || 'live'
  const timePeriod = params.time
  if (type === 'live') {
    return {
      active: true,
      timePeriod: now()
    }
  } else if (type === 'active') {
    return {
      active: true,
      timePeriod: timePeriod
    }
  } else if (type === 'inactive') {
    return {
      active: false,
      timePeriod: timePeriod
    }
  } else {
    return {}
  }
}
const mapDipatchToProps = (dispatch) => bindActionCreators(routerActions, dispatch)

const SessionWithData = compose(
  graphql(SessionQuery,
  // Later use
  // {
  //   options: ({params}) => {
  //     return {
  //       variables: parseRouteParams(params),
  //       forceFetch: true
  //     }
  //   }
  // }
  ),
  graphql(SessionMutation, {
    name: 'deleteSession'
  })
)(Session)

export default connect(null, mapDipatchToProps)(SessionWithData)

