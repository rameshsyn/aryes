import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import {
  Grid,
  Button,
  Modal,
  Form,
  Label
} from 'semantic-ui-react'

class Session extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      instructor: '',
      room: '',
      timeStart: null,
      timeEnd: null,
      period: null
    }
  }
  handleChange (e) {
    const name = e.target.name
    const value = e.target.value
    this.setState({
      [name]: value
    })
  }
  update () {
    this.props.addNewSession({
      variables: {
        name: this.state.name,
        instructor: this.state.instructor,
        room: this.state.room,
        timeStart: Number(this.state.timeStart),
        timeEnd: Number(this.state.timeEnd),
        period: this.state.period
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
                  <label>Instructor</label>
                  <select name='instructor' onChange={this.handleChange.bind(this)}>
                    <option value={this.state.instructor}>Instructor</option>
                    {
                      this.props.data.staff.map((s, i) => {
                        return <option key={i} value={s.id}>{s.name}</option>
                      })
                    }
                  </select>
                </Form.Field>
                <Form.Field>
                  <label>Room</label>
                  <select name='room' onChange={this.handleChange.bind(this)}>
                    <option value={this.state.room}>Room</option>
                    {
                      this.props.data.room.map((r, i) => {
                        return <option key={i} value={r.id}>{r.name}</option>
                      })
                    }
                  </select>
                </Form.Field>
                <Form.Group>
                  <Form.Input label='Start Time' type='text' name='timeStart' onChange={this.handleChange.bind(this)} />
                  <Form.Input label='End Time' type='text' name='timeEnd' onChange={this.handleChange.bind(this)} />
                  <Form.Field>
                    <labe>Peroid</labe>
                    <select name='period' onChange={this.handleChange.bind(this)}>
                      <option value={this.state.period}>Period</option>
                      <option value='AM'>AM</option>
                      <option value='PM'>PM</option>
                    </select>
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
  mutation addNewSession($name: String, $instructor: String, $room: String, $timeStart: Int, $timeEnd: Int, $period: String) {
    addNewSession(name: $name, instructor: $instructor, room: $room, timeStart: $timeStart, timeEnd: $timeEnd, period: $period) {
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
