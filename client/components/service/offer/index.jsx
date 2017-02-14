import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Loading from '../../utils/loading'

const Offer = ({ data }) => {
  if (data.loading) {
    return <Loading />
  }
  return (
    <h1>This is a Offer section</h1>
  )
}

const testQ = gql`
  query test {
    offer {
      code
    }
  }
`

export default graphql(testQ)(Offer)
