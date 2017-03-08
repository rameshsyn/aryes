import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import { routerActions } from 'react-router-redux'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  Grid,
  Button,
  Header,
  Divider,
  Table,
  Dimmer,
  Loader,
  Container
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
      available_time: []
    }
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
          <Loader size='massive'>Loading ...</Loader>
        </Dimmer>
      )
    }
    return (
      <Grid padded>
        <Grid.Row>
          <Container>
            <Header as='h3' textAlign='center'>
              Inquiry
            </Header>
          </Container>
        </Grid.Row>
        <Divider />
        <Grid.Row>
          <Container>
            <Button floated='right'>Filter</Button>
            <Button floated='right' onClick={() => this.props.push('/management/inquiry/new')}>New Inquiry</Button>
          </Container>
        </Grid.Row>
        <Divider horizontal />
        <Grid.Row>
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Date</Table.HeaderCell>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Contact</Table.HeaderCell>
                <Table.HeaderCell>Services</Table.HeaderCell>
                <Table.HeaderCell>Available Time</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {
                this.props.data.inquiry.map((inq, i) => {
                  return (
                    <Table.Row key={i}>
                      <Table.Cell>{inq.date}</Table.Cell>
                      <Table.Cell>{inq.name}</Table.Cell>
                      <Table.Cell>{inq.contact}</Table.Cell>
                      <Table.Cell>{inq.services.map((s, i) => <span key={i}>{s.name},</span>)}</Table.Cell>
                      <Table.Cell>{inq.available_time.map((t, i) => <span key={i}>{t},</span>)}</Table.Cell>
                      <Table.Cell>{inq.status}</Table.Cell>
                    </Table.Row>
                  )
                })
              }
            </Table.Body>
          </Table>
          {this.props.children}
        </Grid.Row>
      </Grid>
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