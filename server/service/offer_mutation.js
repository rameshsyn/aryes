import { Offer } from '../models'
import { OfferType } from '../graphql/types'

export default {
  addNewOffer: {
    type: OfferType,
    args: {
      ...OfferType.getFields()
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

