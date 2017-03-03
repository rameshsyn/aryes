import {
  GraphQLString,
  GraphQLList
} from 'graphql'
import { Staff } from '../../models'
import StaffType from './staff_type'

export default {
  addNewStaff: {
    type: StaffType,
    args: {
      name: {
        type: GraphQLString
      },
      position: {
        type: new GraphQLList(GraphQLString)
      },
      contact: {
        type: GraphQLString
      }
    },
    resolve: (root, params, options) => {
      return new Promise((resolve, reject) => {
        new Staff(params).save((err, staff) => {
          if (err) {
            reject(err)
          } else {
            resolve(staff)
          }
        })
      })
    }
  }
}
