import { Admin } from '../../models'
import AdminType from './admin_type'
import {
  GraphQLList,
  GraphQLString
} from 'graphql'

export default {
  admin: {
    type: new GraphQLList(AdminType),
    args: {
      _id: {
        type: GraphQLString
      }
    },
    resolve: (root, params, options) => {
      return new Promise((resolve, reject) => {
        Admin.find(params)
                .exec((err, admin) => {
                  if (err) {
                    reject(err)
                  } else {
                    resolve(admin)
                  }
                })
      })
    }
  }
}

