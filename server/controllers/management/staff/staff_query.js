import { GraphQLList } from 'graphql'
import { Staff } from '../../../models'
import StaffType from './staff_type'

export default {
  staff: {
    type: new GraphQLList(StaffType),
    resolve: (root, params, options) => {
      return new Promise((resolve, reject) => {
        Staff.find({})
            .populate('position')
            .exec((err, staff) => {
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
