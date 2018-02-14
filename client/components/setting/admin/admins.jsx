import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import {
  Modal,
  Table,
  Button,
  Form,
  Divider,
  Dimmer,
  Loader,
  Message
} from 'semantic-ui-react'

class Admins extends Component {
  constructor () {
    super()
    this.state = {
      name: '',
      email: '',
      password: '',
      message: '',
      messageColor: 'grey',
      formLoading: false
    }
  }
  displayAdmins () {
    const admins = this.props.data.admin
    return admins.map((admin, i) => {
      return (
        <tr key={i}>
          <td>{admin.name}</td>
          <td>{admin.email}</td>
        </tr>
      )
    })
  }
  handleChange (e) {
    const name = e.target.name
    const value = e.target.value
    this.setState({
      [name]: value
    })
  }
  // Form validation
  validate () {
    const {name, email, password} = this.state
    const shouldValidate = [name, email, password]
    let count = 0
    shouldValidate.map(input => {
      // Counts empty fields
      if ((input === '') || (input === 0)) {
        count++
      }
    })
    // Returns true on all required form fields are filled.
    return count === 0
  }
  addAdmin () {
    const { addNewAdmin } = this.props
    if (this.validate()) {
      addNewAdmin({
        variables: {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password
        },
        updateQueries: {
          getAdmins: (prevQuery, newQuery) => {
            const update = newQuery.mutationResult.data.addNewAdmin
            return {
              admin: [
                ...prevQuery.admin,
                update
              ]
            }
          }
        }
      })
      .then(({ data }) => {
        console.log(data)
        if (data) {
          this.setState({
            message: 'Admin Added !',
            messageColor: 'green',
            formLoading: false
          })
        }
      })
      .catch(error => {
        console.log(error)
        if (error) {
          this.setState({
            message: 'Something went wrong !',
            messageColor: 'red',
            formLoading: false
          })
        }
      })
    } else {
      this.setState({
        message: 'Fill a required field !',
        messageColor: 'red',
        formLoading: false
      })
    }
  }
  render () {
    const { loading } = this.props.data
    const { messageColor, message, formLoading } = this.state
    if (loading) {
      return (
        <Dimmer active>
          <Loader size='massive'>Loading ...</Loader>
        </Dimmer>
      )
    }
    return (
      <div>
        <Table color='green'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.displayAdmins()}
          </Table.Body>
        </Table>
        <Divider />
        <Modal trigger={<Button color='green'>Add Admin</Button>}>
          <Modal.Header>Add New Admin</Modal.Header>
          <Modal.Content>
            <Message color={messageColor} hidden={message === ''}>
              <Message.Header>{message}</Message.Header>
            </Message>
            <Form size='small' loading={formLoading}>
              <Form.Input label='Name' placeholder='Name' type='text' onChange={this.handleChange.bind(this)} name='name' />
              <Form.Input label='Email' placeholder='Email' type='text' onChange={this.handleChange.bind(this)} name='email' />
              <Form.Input label='Password' placeholder='Password' type='password' onChange={this.handleChange.bind(this)} name='password' />
              <Form.Button color='green' type='button' onClick={this.addAdmin.bind(this)} floated='right'>Add</Form.Button>
            </Form>
          </Modal.Content>
        </Modal>
      </div>
    )
  }
}
const AdminQuery = gql`
  query getAdmins {
    admin {
      id
      name
      email
    }    
  }
`

const AdminMutation = gql`
  mutation addNewAdmin($name: String!, $email: String!, $password: String!) {
    addNewAdmin(name: $name, email: $email, password: $password) {
     id
     name
     email
    }
  }
`

//const mapDipatchToProps = (dispatch) => bindActionCreators(routerActions, dispatch)

export default compose(
  graphql(AdminQuery),
  graphql(AdminMutation, {
    name: 'addNewAdmin'
  })
)(Admins)

//export default connect(null, mapDipatchToProps)(SessionWithData)
