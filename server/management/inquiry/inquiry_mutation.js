import {
  GraphQLString,
  GraphQLList
} from 'graphql'
import { Inquiry } from '../../models'
import InquiryType from './inquiry_type'

export default {
  addNewInquiry: {
    type: InquiryType,
    args: {
      name: {
        type: GraphQLString
      },
      academic_level: {
        type: GraphQLString
      },
      contact: {
        type: GraphQLString
      },
      services: {
        type: new GraphQLList(GraphQLString)
      },
      date: {
        type: GraphQLString
      },
      available_time: {
        type: new GraphQLList(GraphQLString)
      }
    },
    resolve: (root, params, options) => {
      return new Promise((resolve, reject) => {
        new Inquiry(params).save((err, inquiry) => {
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
