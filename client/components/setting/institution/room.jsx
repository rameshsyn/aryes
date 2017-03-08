import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import {
  Container,
  Button,
  Modal,
  Form,
  Label,
  Divider,
  Dimmer,
  Loader
} from 'semantic-ui-react'

class Room extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      studentComp: 0
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
    this.props.addNewRoom({
      variables: {
        name: this.state.name,
        studentComp: Number(this.state.studentComp)
      },
      updateQueries: {
        getRooms: (prevQuery, newQuery) => {
          const update = newQuery.mutationResult.data.addNewRoom
          return {
            room: [
              ...prevQuery.room,
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
      return (
        <Dimmer active>
          <Loader size='massive'>Loading ...</Loader>
        </Dimmer>
      )
    }
    return (
      <Container>
        {
          this.props.data.room.map((r, i) => {
            return <Label key={i}>{r.name}</Label>
          })
        }
        <Divider />
        <Modal trigger={<Button color='green'>Add Room</Button>}>
          <Modal.Header>Add New Room</Modal.Header>
          <Modal.Content>
            <Form size='small'>
              <Form.Input label='Room Name' type='text' name='name' onChange={this.handleChange.bind(this)} />
              <Form.Input label='Student Compatible' type='text' name='studentComp' onChange={this.handleChange.bind(this)} />
              <Form.Button type='button' color='green' floated='right' onClick={this.update.bind(this)}>Add</Form.Button>
            </Form>
          </Modal.Content>
        </Modal>
      </Container>
    )
  }
}

const RoomQuery = gql`
  query getRooms {
    room {
      id
      name
      studentComp
    }
  }
`

const RoomMutation = gql`
  mutation addNewRoom($name: String, $studentComp: Int) {
    addNewRoom(name: $name, studentComp: $studentComp) {
      id
      name
      studentComp
    }
  }
`
export default compose(
  graphql(RoomQuery),
  graphql(RoomMutation, {
    name: 'addNewRoom'
  })
)(Room)
