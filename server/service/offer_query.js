import { Offer } from '../models'
import OfferType from './offer_type'
import {
  GraphQLString,
  GraphQLList
} from 'graphql'

export default {
  offer: {
    type: new GraphQLList(OfferType),
    args: {
      id: {
        type: GraphQLString
      }
    },
    resolve: (root, params, options) => {
      // find offer as argument if argument is specified
      const query = params.id ? { _id: params.id } : {}
      return new Promise((resolve, reject) => {
        Offer.find(query, (err, offer) => {
          if (err) {
            reject(err)
          } else {
            resolve(offer)
          }
        })
      })
    }
  }
}

