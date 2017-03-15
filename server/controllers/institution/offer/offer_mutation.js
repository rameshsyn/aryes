import { Offer } from '../../../models'
import OfferType from './offer_type'

export default {
  addNewOffer: {
    type: OfferType,
    args: {
      ...OfferType.getFields()
    },
    resolve: (root, params, options) => {
      const newOffer = params
      newOffer.date_created = Date.now()
      newOffer.active = true
      return new Promise((resolve, reject) => {
        new Offer(newOffer).save((err, offer) => {
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

