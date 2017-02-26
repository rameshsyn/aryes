import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import {
  Form,
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
      return <h1>Loading</h1>
    }
    return (
      <div>
        <div>
          <h1>Institution name: {this.props.data.institution_info ? this.props.data.institution_info.name : 'add tuition information'}</h1>
        </div>
        <Divider horizontal>ADD</Divider>
        <Form size='big'>
          <Form.Input label='Institution name' type='text' name='name' onChange={this.handleChange.bind(this)} />
          <Form.Group widths='equal'>
            <Form.Input label='Phone' type='text' name='phone' onChange={this.handleChange.bind(this)} />
            <Form.Input label='Email' type='text' name='email' onChange={this.handleChange.bind(this)} />
          </Form.Group>
          <Form.Input label='Location' type='text' name='location' onChange={this.handleChange.bind(this)} />
          <Form.Button type='button' color='green' onClick={this.update.bind(this)}>Submit</Form.Button>
        </Form>
      </div>
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
