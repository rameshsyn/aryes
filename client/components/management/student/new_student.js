import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { routerActions } from 'react-router-redux'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import gql from 'graphql-tag'
import {
  Modal,
  Form,
  Divider,
  Dropdown
} from 'semantic-ui-react'

class NewStudent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      address: '',
      level: '',
      school: '',
      phone: '',
      email: '',
      date: null,
      products: [],
      sessions: [],
      offers: [],
      modalOpen: true
    }
  }
  handleModalClose (e) {
    this.setState({
      modalOpen: false
    })
    // route to student page
    this.props.push('/management/student')
  }
  handleProductItem (e, { value }) {
    this.setState({
      products: value
    })
  }
  handleSessionItem (e, { value }) {
    this.setState({
      sessions: value
    })
  }
  handleOfferItem (e, { value }) {
    this.setState({
      offers: value
    })
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
  makeSessionItems () {
    const { session } = this.props.data
    return session.map(s => {
      return {
        key: s.id,
        text: s.name,
        value: s.id
      }
    })
  }
  makerOfferItems () {
    const { offer } = this.props.data
    return offer.map(o => {
      return {
        key: o.id,
        text: o.code,
        value: o.id
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
    this.props.addNewStudent({
      variables: {
        name: this.state.name,
        address: this.state.address,
        academic_level: this.state.level,
        school: this.state.school,
        phone: this.state.phone,
        email: this.state.email,
        date: this.state.date,
        products: this.state.products,
        sessions: this.state.sessions,
        offers: this.state.offers
      },
      updateQueries: {
        getStudents: (prevQuery, newQuery) => {
          const update = newQuery.mutationResult.data.addNewStudent
          return {
            student: [
              ...prevQuery.student,
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
    return (
      <Modal open={this.state.modalOpen} onClose={this.handleModalClose.bind(this)}>
        <Modal.Header>Add New Student</Modal.Header>
        <Modal.Content>
          <Form size='small'>
            <Divider horizontal>Basic Information</Divider>
            <Form.Group>
              <Form.Input label='Name:' type='text' placeholder='Full name' name='name' onChange={this.handleChange.bind(this)} />
              <Form.Input label='Address' type='text' placeholder='Address' name='address' onChange={this.handleChange.bind(this)} />
              <Form.Input label='Academic level' type='text' placeholder='Academic level' name='level' onChange={this.handleChange.bind(this)} />
              <Form.Input label='School Name' type='text' placeholder='School name' name='school' onChange={this.handleChange.bind(this)} />
            </Form.Group>
            <Divider horizontal>Contact Information</Divider>
            <Form.Group>
              <Form.Input label='Phone Number' type='text' placeholder='Phone' name='phone' onChange={this.handleChange.bind(this)} />
              <Form.Input label='Email address' type='text' placeholder='Email' name='email' onChange={this.handleChange.bind(this)} />
            </Form.Group>
            <Divider horizontal>Enrollment Information</Divider>
            <Form.Group>
              <Form.Input label='Enroll Date' type='date' placeholder='Enroll date' name='date' onChange={this.handleChange.bind(this)} />
              <Form.Field>
                <label>Products</label>
                <Dropdown placeholder='Products' search selection multiple options={this.makeProductItems.bind(this)()} value={this.state.products} onChange={this.handleProductItem.bind(this)} />
              </Form.Field>
              <Form.Field>
                <label>Sessions</label>
                <Dropdown placeholder='Sessions' search selection multiple options={this.makeSessionItems.bind(this)()} value={this.state.sessions} onChange={this.handleSessionItem.bind(this)} />
              </Form.Field>
            </Form.Group>
            <Divider horizontal>Extra Information</Divider>
            <Form.Group>
              <Form.Field>
                <label>Offers</label>
                <Dropdown placeholder='Products' search selection multiple options={this.makerOfferItems.bind(this)()} value={this.state.offers} onChange={this.handleOfferItem.bind(this)} />
              </Form.Field>
            </Form.Group>
            <Form.Button type='button' onClick={this.update.bind(this)}>Register</Form.Button>
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}
const StudentQuery = gql`
  query getStudents {
    student {
      id 
      basic_info {
        name
        address
        academic_level
      }
      contact_info {
        phone
        email
      }
    }
    product {
      id
      name
    }
    session {
      id
      name
    }
    offer {
      id
      code
    }
  }
`
const StudentMutation = gql`
  mutation addNewStudent($name: String, $address: String, $academic_level: String, $school: String, $phone: String, $email: String, $date: String, $products: [String], $sessions: [String], $offers: [String] ) {
    addNewStudent(name: $name, address: $address, academic_level: $academic_level, school: $school, phone: $phone, email: $email, date: $date, products: $products, sessions: $sessions, offers: $offers) {
      id 
      basic_info {
        name
        address
        academic_level
      }
      contact_info {
        phone
        email
      }
    }
  }
`

const mapDipatchToProps = (dispatch) => bindActionCreators(routerActions, dispatch)

const StudentWithDate = compose(
  graphql(StudentQuery),
  graphql(StudentMutation, { name: 'addNewStudent' })
)(NewStudent)

export default connect(null, mapDipatchToProps)(StudentWithDate)
