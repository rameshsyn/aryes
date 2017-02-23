import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import Loading from '../../utils/loading'
// import { wrapper, offer } from './offer.scss'
// import update from 'immutability-helper'
import {
  Grid
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
          const newOffer = newQuery.mutationResult.data.addNewOffer
          // const test = update(prevQuery, {
          //   offer: {
          //     $unshift: [newOffer]
          //   }
          // })
          return {
            offer: [
              ...prevQuery.offer,
              newOffer
            ]
          }
        }
      }
    })
    .then(({ data }) => {
      // const offers = this.props.data.offer
      // const newOffer = data.addNewOffer
      // this.setState({
      //   offers: [...offers, newOffer]
      // })
      console.log('got data', data)
    })
    .catch((error) => {
      console.log('there was an error sending the query', error)
    })
  }
  render () {
    if (this.props.data.loading) {
      return <Loading />
    }
    return (
      <Grid>
        <Grid.Row color='yellow'>
          <label htmlFor='code'>Code</label>
          <input type='text' onChange={this.handleChange.bind(this)} name='code' id='code' style={{ background: 'gray' }} /> <br />
          <label htmlFor='discount'>Discount</label>
          <input type='text' onChange={this.handleChange.bind(this)} name='discount' id='discount' style={{ background: 'gray' }} /> <br />
          <label htmlFor='description'>Description</label>
          <textarea type='text' onChange={this.handleChange.bind(this)} name='description' id='description' style={{ background: 'gray' }} /><br />
          <button type='button' onClick={this.addOffer.bind(this)} style={{ background: 'gold' }}>Add</button>
        </Grid.Row>
        <Grid.Row>
          <table>
            <thead>
              <tr>
                <th>Code</th>
                <th>Discount</th>
                <th>Description</th>
                <th>Date</th>
                <th>Active</th>
              </tr>
            </thead>
            <tbody>
              {this.displayOffers()}
            </tbody>
          </table>
        </Grid.Row>
      </Grid>
    )
  }
}

// const getAOffer = gql`
//   mutation getAOffer($id: String!) {
//     offer(id: $id) {
//       id
//       code
//       description
//       date_created
//       discount
//       active
//     }
//   }
// `

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
