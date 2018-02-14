import React, {Component} from 'react'
import {
  Divider,
  Modal,
  Form,
  Button,
  Message
} from 'semantic-ui-react'

class Account extends Component {
  constructor () {
    super()
    this.state = {
      message: '',
      messageColor: 'grey',
      email: '',
      name: '',
      password: ''
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
    console.log('update')
  }
  render () {
    const { messageColor, message, name, email, password } = this.state
    return (
      <div>
        <h3>Name: </h3>
        <h3>Email: </h3>
        <h3>Password: *********</h3>
        <Divider />
        <Modal trigger={<Button color='green'>Update</Button>}>
          <Modal.Header>Update Your Information</Modal.Header>
          <Modal.Content>
            <Message color={messageColor} hidden={message === ''}>
              <Message.Header>{message}</Message.Header>
            </Message>
            <Form size='big'>
              <Form.Input label='Name' type='text' name='name' value={name} onChange={this.handleChange.bind(this)} />
              <Form.Input label='Email' type='text' name='email' value={email} onChange={this.handleChange.bind(this)} />
              <Form.Input label='Password' type='password' name='password' value={password} onChange={this.handleChange.bind(this)} />
              <Form.Button type='button' color='green' onClick={this.update.bind(this)}>Update</Form.Button>
            </Form>
          </Modal.Content>
        </Modal>
      </div>
    )
  }
}

export default Account
