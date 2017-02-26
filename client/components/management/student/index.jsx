import React, { Component, PropTypes } from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import {
  Grid,
  Button,
  Modal,
  Form,
  Divider,
  Table
} from 'semantic-ui-react'

class Student extends Component {
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
      products: '',
      sessions: '',
      discount: 0,
      offers: ''
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
        discount: Number(this.state.discount),
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
    if (this.props.data.loading) {
      return <h1>loading</h1>
    }
    return (
      <Grid>
        <Grid.Row>
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Address</Table.HeaderCell>
                <Table.HeaderCell>Level</Table.HeaderCell>
                <Table.HeaderCell>Phone</Table.HeaderCell>
                <Table.HeaderCell>Email</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {
                this.props.data.student.map((s, i) => {
                  return (
                    <Table.Row key={i}>
                      <Table.Cell>{s.basic_info.name}</Table.Cell>
                      <Table.Cell>{s.basic_info.address}</Table.Cell>
                      <Table.Cell>{s.basic_info.academic_level}</Table.Cell>
                      <Table.Cell>{s.contact_info.phone}</Table.Cell>
                      <Table.Cell>{s.contact_info.email}</Table.Cell>
                    </Table.Row>
                  )
                })
              }
            </Table.Body>
          </Table>
        </Grid.Row>
        <Divider horizontal />
        <Grid.Row>
          <Modal trigger={<Button>Add Student</Button>}>
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
                    <label>Product</label>
                    <select name='products' onChange={this.handleChange.bind(this)}>
                      <option value={this.state.products}>product</option>
                      {
                        this.props.data.product.map((p, i) => {
                          return <option value={p.id} key={i}>{p.name}</option>
                        })
                      }
                    </select>
                  </Form.Field>
                  <Form.Field>
                    <label>Session</label>
                    <select name='sessions' onChange={this.handleChange.bind(this)}>
                      <option value={this.state.sessions}>session</option>
                      {
                        this.props.data.session.map((s, i) => {
                          return <option value={s.id} key={i}>{s.name}</option>
                        })
                      }
                    </select>
                  </Form.Field>
                </Form.Group>
                <Divider horizontal>Extra Information</Divider>
                <Form.Group>
                  <Form.Input label='Discount' type='text' placeholder='Discount amount' name='discount' onChange={this.handleChange.bind(this)} />
                  <Form.Field>
                    <label>Offer</label>
                    <select name='offers' onChange={this.handleChange.bind(this)}>
                      <option value={this.state.offers}>offer</option>
                      {
                        this.props.data.offer.map((o, i) => {
                          return <option value={o.id} key={i}>{o.code}</option>
                        })
                      }
                    </select>
                  </Form.Field>
                </Form.Group>
                <Form.Button type='button' onClick={this.update.bind(this)}>Register</Form.Button>
              </Form>
            </Modal.Content>
          </Modal>
        </Grid.Row>
      </Grid>
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
  mutation addNewStudent($name: String, $address: String, $academic_level: String, $school: String, $phone: String, $email: String, $date: String, $products: String, $sessions: String, $discount: Int, $offers: String ) {
    addNewStudent(name: $name, address: $address, academic_level: $academic_level, school: $school, phone: $phone, email: $email, date: $date, products: $products, sessions: $sessions, discount: $discount, offers: $offers) {
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
export default compose(
  graphql(StudentQuery),
  graphql(StudentMutation, {
    name: 'addNewStudent'
  })
)(Student)
