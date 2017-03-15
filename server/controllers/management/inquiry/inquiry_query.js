import { Inquiry } from '../../../models'
import InquiryType from './inquiry_type'
import {
  GraphQLList
} from 'graphql'

export default {
  inquiry: {
    type: new GraphQLList(InquiryType),
    resolve: (root, params, options) => {
      return new Promise((resolve, reject) => {
        Inquiry.find({})
                .populate('product')
                .exec((err, inquiry) => {
                  if (err) {
                    reject(err)
                  } else {
                    resolve(inquiry)
                  }
                })
      })
    }
  }
}

