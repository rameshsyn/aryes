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

class Room extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: ''
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
        name: this.state.name
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
      return <h1>loading</h1>
    }
    return (
      <Grid>
        <Grid.Row>
          {
            this.props.data.room.map((r, i) => {
              return <Label key={i}>{r.name}</Label>
            })
          }
        </Grid.Row>
        <Grid.Row>
          <Modal trigger={<Button>Add Room</Button>}>
            <Modal.Header>Add New Room</Modal.Header>
            <Modal.Content>
              <Form size='small'>
                <Form.Input label='Room Name' type='text' name='name' onChange={this.handleChange.bind(this)} />
                <Form.Button type='button' color='green' floated='right' onClick={this.update.bind(this)}>Add</Form.Button>
              </Form>
            </Modal.Content>
          </Modal>
        </Grid.Row>
      </Grid>
    ) 
  }
}

const RoomQuery = gql`
  query getRooms {
    room {
      id
      name
    }
  }
`

const RoomMutation = gql`
  mutation addNewRoom($name: String) {
    addNewRoom(name: $name) {
      id
      name
    }
  }
`
export default compose(
  graphql(RoomQuery),
  graphql(RoomMutation, {
    name: 'addNewRoom'
  })
)(Room)
