import { Offer } from '../../../models'

export default function (offerType, { GraphQLString, GraphQLList }) {
  return {
    offer: {
      type: new GraphQLList(offerType),
      resolve: (root, params, options) => {
        return new Promise((resolve, reject) => {
          Offer.find({}, (err, user) => {
            if (err) {
              reject(err)
            } else {
              resolve(user)
            }
          })
        })
      }
    }
  }
}
