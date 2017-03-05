import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import { routerActions } from 'react-router-redux'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  Modal,
  Form,
  Dimmer,
  Loader,
  Dropdown
} from 'semantic-ui-react'

class Inquiry extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      level: '',
      contact: '',
      date: null,
      services: [],
      available_time: [],
      modalOpen: true
    }
  }
  handleModalClose (e) {
    this.setState({
      modalOpen: false
    })
    // route to inquiry page
    this.props.push('/management/inquiry')
  }
  handleProductItem (e, { value }) {
    this.setState({
      services: value
    })
  }
  handleAvailableTime (e, { value }) {
    this.setState({
      available_time: value
    })
  }
  makeAvailableTimes () {
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
  makeProductItems () {
    const { product } = this.props.data
    return product.map(p => {
      return {
        key: p.id,
        text: p.name,
        value: p.id
      }
    })
  }
  handleChange (e) {
    const name = e.target.name
    const value = e.target.value
    this.setState({
      [name]: value
    })
  }
  update () {
    this.props.addNewInquiry({
      variables: {
        name: this.state.name,
        academic_level: this.state.level,
        contact: this.state.contact,
        date: this.state.date,
        services: this.state.services,
        available_time: this.state.available_time
      },
      updateQueries: {
        getInquiries: (prevQuery, newQuery) => {
          const update = newQuery.mutationResult.data.addNewInquiry
          return {
            inquiry: [
              ...prevQuery.inquiry,
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
          <Loader />
        </Dimmer>
      )
    }
    return (
      <Modal open={this.state.modalOpen} onClose={this.handleModalClose.bind(this)}>
        <Modal.Header>Add New Inquiry</Modal.Header>
        <Modal.Content>
          <Form size='small'>
            <Form.Group>
              <Form.Input label='Name:' type='text' placeholder='Full name' name='name' onChange={this.handleChange.bind(this)} />
              <Form.Input label='Academic level' type='text' placeholder='Academic level' name='level' onChange={this.handleChange.bind(this)} />
              <Form.Input label='Contact Number' type='text' placeholder='Phone' name='contact' onChange={this.handleChange.bind(this)} />
              <Form.Input label='Date' type='date' placeholder='Date' name='date' onChange={this.handleChange.bind(this)} />
            </Form.Group>
            <Form.Field>
              <label>Available Time</label>
              <Dropdown placeholder='Time period' search selection multiple options={this.makeAvailableTimes.bind(this)()} value={this.state.available_time} onChange={this.handleAvailableTime.bind(this)} />
            </Form.Field>
            <Form.Field>
              <label>Services</label>
              <Dropdown placeholder='Products' search selection multiple options={this.makeProductItems.bind(this)()} value={this.state.services} onChange={this.handleProductItem.bind(this)} />
            </Form.Field>
            <Form.Button type='button' onClick={this.update.bind(this)}>Register</Form.Button>
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

const InquiryQuery = gql`
  query getInquiries {
  inquiry {
    id
    name
    date
    available_time
    contact
    services {
      id
      name
    }
  }
  product {
    id
    name
  }    
}  
`

const InquiryMutation = gql`
  mutation addNewInquiry($name: String, $academic_level: String, $contact: String, $available_time: [String], $services: [String], $date: String) {
    addNewInquiry(name: $name, academic_level: $academic_level, contact: $contact, available_time: $available_time, services: $services, date: $date) {
      id
      name
      date
      available_time
      contact
      services {
        id
        name
      }
    }
  }
`
const mapDipatchToProps = (dispatch) => bindActionCreators(routerActions, dispatch)

const InquiryWithData = compose(
  graphql(InquiryQuery),
  graphql(InquiryMutation, {
    name: 'addNewInquiry'
  })
)(Inquiry)

export default connect(null, mapDipatchToProps)(InquiryWithData)
