import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import Loading from '../../utils/loading'
import { wrapper, offer } from './offer.scss'

class Offer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      offers: props.data.offer,
      code: '',
      discount: 0,
      description: ''
    }
  }
  displayOffers () {
    this.props.data.refetch()
    const offers = this.state.offers || this.props.data.offer
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
      }
    })
    .then(({ data }) => {
      const offers = this.state.offers || this.props.data.offer
      const newOffer = data.addNewOffer
      this.setState({
        offers: [...offers, newOffer]
      })
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
      <div>
        <div>
          <label htmlFor='code'>Code</label>
          <input type='text' onChange={this.handleChange.bind(this)} name='code' id='code' style={{ background: 'gray' }} /> <br />
          <label htmlFor='discount'>Discount</label>
          <input type='text' onChange={this.handleChange.bind(this)} name='discount' id='discount' style={{ background: 'gray' }} /> <br />
          <label htmlFor='description'>Description</label>
          <textarea type='text' onChange={this.handleChange.bind(this)} name='description' id='description' style={{ background: 'gray' }} /><br />
          <button type='button' onClick={this.addOffer.bind(this)} style={{ background: 'gold' }}>Add</button>
        </div>
        <div>
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
        </div>
      </div>
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
  // graphql(getAOffer, {
  //   name: 'offer',
  //   options: () => {
  //     return {
  //       variables: {
  //         id: '58abd9b76504a769a7fc4ba8'
  //       }
  //     }
  //   }
  // }),
  graphql(offerMutation, {
    name: 'addNewOffer'
  })
  )(Offer)
