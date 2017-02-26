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

class Staff extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      contact: '',
      position: ''
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
    this.props.addNewStaff({
      variables: {
        name: this.state.name,
        contact: this.state.contact,
        position: this.state.position
      },
      updateQueries: {
        getStaffs: (prevQuery, newQuery) => {
          const update = newQuery.mutationResult.data.addNewStaff
          return {
            staff: [
              ...prevQuery.staff,
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
            this.props.data.staff.map((s, i) => {
              return <Label key={i}>{s.name}</Label>
            })
          }
        </Grid.Row>
        <Grid.Row>
          <Modal trigger={<Button>Add Staff</Button>}>
            <Modal.Header>Add New Staff</Modal.Header>
            <Modal.Content>
              <Form size='small'>
                <Form.Input label='Name' type='text' name='name' onChange={this.handleChange.bind(this)} />
                <Form.Input label='Contact' type='text' name='contact' onChange={this.handleChange.bind(this)} />
                <Form.Input label='Position' type='text' name='position' onChange={this.handleChange.bind(this)} />
                <Form.Button type='button' color='green' floated='right' onClick={this.update.bind(this)}>Add</Form.Button>
              </Form>
            </Modal.Content>
          </Modal>
        </Grid.Row>
      </Grid>
    )
  }
}

const StaffQuery = gql`
  query getStaffs {
    staff {
      id
      name
      position
      contact
    }
  }
`

const StaffMutation = gql`
  mutation addNewStaff($name: String, $contact: String, $position: String) {
    addNewStaff(name: $name, contact: $contact, position: $position) {
      id
      name
      position
      contact
    }
  }
`
export default compose(
  graphql(StaffQuery),
  graphql(StaffMutation, {
    name: 'addNewStaff'
  })
)(Staff)
