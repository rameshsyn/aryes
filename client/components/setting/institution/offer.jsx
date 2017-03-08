import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import {
  Container,
  Dimmer,
  Loader,
  Divider,
  Form,
  Modal,
  Button,
  Table
} from 'semantic-ui-react'

class Offer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      code: '',
      discount: 0,
      description: ''
    }
  }
  displayOffers () {
    const offers = this.props.data.offer
    return offers.map((ofr, i) => {
      return (
        <tr key={i} id={ofr.id}>
          <td>{ofr.code}</td>
          <td>{ofr.discount}</td>
          <td>{ofr.description}</td>
          <td>{ofr.date_created}</td>
          <td>{ofr.active ? 'active' : 'inactive'}</td>
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
  addOffer () {
    this.props.addNewOffer({
      variables: {
        code: this.state.code,
        description: this.state.description,
        discount: this.state.discount
      },
      updateQueries: {
        getOffers: (prevQuery, newQuery) => {
          const update = newQuery.mutationResult.data.addNewOffer
          return {
            offer: [
              ...prevQuery.offer,
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
      <Container>
        <Table color='green'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Code</Table.HeaderCell>
              <Table.HeaderCell>Discount</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell>Created date</Table.HeaderCell>
              <Table.HeaderCell>Active</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {
              this.props.data.offer.map((o, i) => {
                return (
                  <Table.Row key={i}>
                    <Table.Cell>{o.code}</Table.Cell>
                    <Table.Cell>{o.discount}</Table.Cell>
                    <Table.Cell>{o.description}</Table.Cell>
                    <Table.Cell>{o.date_created}</Table.Cell>
                    <Table.Cell>{o.active ? 'active' : 'inactive'}</Table.Cell>
                  </Table.Row>
                )
              })
            }
          </Table.Body>
        </Table>
        <Divider />
        <Modal trigger={<Button color='green'>Add Offer</Button>}>
          <Modal.Header>Add New offer</Modal.Header>
          <Modal.Content>
            <Form size='small'>
              <Form.Input label='Code' placeholder='Code' type='text' onChange={this.handleChange.bind(this)} name='code' />
              <Form.Input label='Discount' placeholder='Discount' type='text' onChange={this.handleChange.bind(this)} name='discount' />
              <Form.TextArea label='Description' placeholder='Description' onChange={this.handleChange.bind(this)} name='description' />
              <Form.Button color='green' type='button' onClick={this.addOffer.bind(this)} floated='right'>Add</Form.Button>
            </Form>
          </Modal.Content>
        </Modal>
      </Container>
    )
  }
}

const offerQuery = gql`
query getOffers {
  offer {
    id
    code
    description
    date_created
    discount
    active
  }
}
`
const offerMutation = gql`
mutation addNewOffer($code: String, $description: String, $discount: Int ) {
  addNewOffer(code: $code, description: $description, discount: $discount) {
    id
    code
    description
    date_created
    discount
    active
  }
}
`

export default compose(
  graphql(offerQuery),
  graphql(offerMutation, {
    name: 'addNewOffer'
  })
  )(Offer)
