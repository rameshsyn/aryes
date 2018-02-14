import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import {
  Form,
  Container,
  Modal,
  Button,
  Dimmer,
  Loader,
  Divider,
  Message
} from 'semantic-ui-react'

class General extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      location: '',
      phone: '',
      email: '',
      message: '',
      messageColor: 'grey'
    }
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
    const { name, location, email, phone } = this.state
    const shouldValidate = [name, location, email, phone]
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
  update () {
    const { updateInstitutionInfo } = this.props
    const { name, location, email, phone } = this.state
    if (this.validate()) {
      updateInstitutionInfo({
        variables: {
          name,
          location,
          email,
          phone
        },
        updateQueries: {
          getInstitutionInfo: (prevQuery, newQuery) => {
            const update = newQuery.mutationResult.data.updateInstitutionInfo
            return {
              institution_info: update
            }
          }
        }
      })
      .then(({ data }) => {
        if (data) {
          this.setState({
            message: 'Information updated !',
            messageColor: 'green'
          })
        }
      })
      .catch((error) => {
        if (error) {
          this.setState({
            message: 'Something went wrong !',
            messageColor: 'red'
          })
        }
      })
    } else {
      this.setState({
        message: 'Fill out required form fields',
        messageColor: 'red'
      })
    }
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.data.institution_info) {
      const {data: {institution_info: {name, contact, location}}} = nextProps
      this.setState({
        name,
        location,
        email: contact.email,
        phone: contact.phone
      })
    }
  }
  render () {
    if (this.props.data.loading) {
      return (
        <Dimmer active>
          <Loader size='massive'>Loading ...</Loader>
        </Dimmer>
      )
    }
    const { messageColor, message, name, location, email, phone } = this.state
    return (
      <Container text>
        <div>
          <h3>Name: <i>{ name }</i></h3>
          <h3>Location: <i>{ location }</i></h3>
          <h3>Email: <i>{ email }</i></h3>
          <h3>Phone: <i>{ phone }</i></h3>
        </div>
        <Divider />
        <Modal trigger={<Button color='green'>Update</Button>}>
          <Modal.Header>Update Institution Information</Modal.Header>
          <Modal.Content>
            <Message color={messageColor} hidden={message === ''}>
              <Message.Header>{message}</Message.Header>
            </Message>
            <Form size='big'>
              <Form.Input label='Institution name' type='text' name='name' value={name} onChange={this.handleChange.bind(this)} />
              <Form.Group widths='equal'>
                <Form.Input label='Phone' type='text' name='phone' value={phone} onChange={this.handleChange.bind(this)} />
                <Form.Input label='Email' type='text' name='email' value={email} onChange={this.handleChange.bind(this)} />
              </Form.Group>
              <Form.Input label='Location' type='text' name='location' value={location} onChange={this.handleChange.bind(this)} />
              <Form.Button type='button' color='green' onClick={this.update.bind(this)}>Update</Form.Button>
            </Form>
          </Modal.Content>
        </Modal>
      </Container>
    )
  }
}

const InstitutionQuery = gql`
query getInstitutionInfo {
  institution_info {
    id
    name
    location
    contact {
      phone
      email
    }
  }
}`

const InstitutionMutation = gql`
mutation updateInstitutionInfo($name: String!, $location: String!, $email: String!, $phone: String!) {
  updateInstitutionInfo(name: $name, location: $location, email: $email, phone: $phone) {
    id
    name
    location
    contact {
      phone
      email
    }
  }
}`

export default compose(
  graphql(InstitutionQuery),
  graphql(InstitutionMutation, {
    name: 'updateInstitutionInfo'
  })
)(General)
