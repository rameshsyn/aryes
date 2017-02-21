import { Offer } from '../../../models'

export default function (offerType, { GraphQLString, GraphQLList }) {
  return {
    offer: {
      type: new GraphQLList(offerType),
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
}
