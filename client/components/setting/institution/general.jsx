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
  Divider
} from 'semantic-ui-react'

class General extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      location: '',
      phone: '',
      email: ''
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
    this.props.updateInstitutionInfo({
      variables: {
        id: this.state.id,
        name: this.state.name,
        location: this.state.location,
        phone: this.state.phone,
        email: this.state.email
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
    const { name, location, contact } = this.props.data.institution_info
    return (
      <Container text>
        <div>
          <h3>Name: <i>{ name }</i></h3>
          <h3>Location: <i>{ location }</i></h3>
          <h3>Email: <i>{ contact.email }</i></h3>
          <h3>Phone: <i>{ contact.phone }</i></h3>
        </div>
        <Divider />
        <Modal trigger={<Button color='green'>Update</Button>}>
          <Modal.Header>Update Institution Information</Modal.Header>
          <Modal.Content>
            <Form size='big'>
              <Form.Input label='Institution name' placeholder={name} type='text' name='name' onChange={this.handleChange.bind(this)} />
              <Form.Group widths='equal'>
                <Form.Input label='Phone' type='text' placeholder={contact.phone} name='phone' onChange={this.handleChange.bind(this)} />
                <Form.Input label='Email' type='text' placeholder={contact.email} name='email' onChange={this.handleChange.bind(this)} />
              </Form.Group>
              <Form.Input label='Location' type='text' placeholder={location} name='location' onChange={this.handleChange.bind(this)} />
              <Form.Button type='button' color='green' onClick={this.update.bind(this)}>Submit</Form.Button>
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
mutation updateInstitutionInfo($name: String, $location: String, $email: String, $phone: String) {
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
