import { Offer } from '../../../models'

export default function (offerType, { GraphQLString, GraphQLList }) {
  return {
    addNewOffer: {
      type: offerType,
      args: {
        ...offerType.getFields()
      },
      resolve: (root, params, options) => {
        const offer = params
        offer.date_created = Date.now()
        offer.active = true
        return new Promise((resolve, reject) => {
          new Offer(offer).save((err, user) => {
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
