import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import {
  Grid,
  Button,
  Modal,
  Form,
  Label,
  Dropdown
} from 'semantic-ui-react'

class Session extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      instructor: '',
      room: '',
      timePeriod: ''
    }
  }
  makeRoomItems () {
    const { room } = this.props.data
    return room.map(r => {
      return {
        key: r.id,
        text: r.name,
        value: r.id
      }
    })
  }
  makeInstructorItems () {
    const { staff } = this.props.data
    return staff.map(s => {
      return {
        key: s.id,
        text: s.name,
        value: s.id
      }
    })
  }
  handleRoomItem (e, { value }) {
    this.setState({
      room: value
    })
  }
  handleInstructorItem (e, { value }) {
    this.setState({
      instructor: value
    })
  }
  handleChange (e) {
    const name = e.target.name
    const value = e.target.value
    this.setState({
      [name]: value
    })
  }
  handleTimeperiodItem (e, { value }) {
    this.setState({
      timePeriod: value
    })
  }
  makeTimeperiodItems () {
    return [
     { key: '1', text: '6AM-7AM', value: '6AM-7AM' },
     { key: '2', text: '7AM-8AM', value: '7AM-8AM' },
     { key: '3', text: '8AM-9AM', value: '8AM-9AM' },
     { key: '4', text: '9AM-10AM', value: '9AM-10AM' },
     { key: '5', text: '10AM-11AM', value: '10AM-11AM' },
     { key: '6', text: '11AM-12PM', value: '11AM-12PM' },
     { key: '7', text: '12PM-1PM', value: '12PM-1PM' },
     { key: '8', text: '1PM-2PM', value: '1PM-2PM' },
     { key: '9', text: '2PM-3PM', value: '2PM-3PM' },
     { key: '10', text: '3PM-4PM', value: '3PM-4PM' },
     { key: '11', text: '4PM-5PM', value: '4PM-5PM' },
     { key: '12', text: '5PM-6PM', value: '5PM-6PM' },
     { key: '13', text: '6PM-7PM', value: '6PM-7PM' }
    ]
  }
  update () {
    this.props.addNewSession({
      variables: {
        name: this.state.name,
        instructor: this.state.instructor,
        room: this.state.room,
        timePeriod: this.state.timePeriod
      },
      updateQueries: {
        getSessions: (prevQuery, newQuery) => {
          const update = newQuery.mutationResult.data.addNewSession
          return {
            session: [
              ...prevQuery.session,
              update
            ]
          }
        }
      }
    })
    .then(({ data }) => {
      console.log('got data', data)
    })
    .catch((error) => {
      console.log('there was an error sending the query', error)
    })
  }
  render () {
    if (this.props.data.loading) {
      return <h1>loading</h1>
    }
    return (
      <Grid>
        <Grid.Row>
          {
            this.props.data.session.map((s, i) => {
              return <Label key={i}>{s.name}</Label>
            })
          }
        </Grid.Row>
        <Grid.Row>
          <Modal trigger={<Button>Add Session</Button>}>
            <Modal.Header>Add New Session</Modal.Header>
            <Modal.Content>
              <Form size='small'>
                <Form.Input label='Name' type='text' placeholder='Name' name='name' onChange={this.handleChange.bind(this)} />
                <Form.Field>
                  <label>Instructors</label>
                  <Dropdown placeholder='Instructors' search selection options={this.makeInstructorItems.bind(this)()} value={this.state.instructor} onChange={this.handleInstructorItem.bind(this)} />
                </Form.Field>
                <Form.Field>
                  <label>Room</label>
                  <Dropdown placeholder='Rooms' search selection options={this.makeRoomItems.bind(this)()} value={this.state.room} onChange={this.handleRoomItem.bind(this)} />
                </Form.Field>
                <Form.Group>
                  <Form.Field>
                    <labe>Time Peroid</labe>
                    <Dropdown placeholder='Periods' search selection options={this.makeTimeperiodItems.bind(this)()} value={this.state.timePeriod} onChange={this.handleTimeperiodItem.bind(this)} />
                  </Form.Field>
                </Form.Group>
                <Form.Button type='button' color='green' floated='right' onClick={this.update.bind(this)}>Add</Form.Button>
              </Form>
            </Modal.Content>
          </Modal>
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

export default compose(
  graphql(SessionQuery),
  graphql(SessionMutation, {
    name: 'addNewSession'
  })
)(Session)
