import {
  GraphQLString,
  GraphQLNonNull
} from 'graphql'
import { Admin } from '../../models'
import AdminType from './admin_type'

export default {
  addNewAdmin: {
    type: AdminType,
    args: {
      name: {
        type: new GraphQLNonNull(GraphQLString)
      },
      email: {
        type: new GraphQLNonNull(GraphQLString)
      },
      password: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: (root, params, options) => {
      const newAdmin = new Admin()
      newAdmin.name = params.name
      newAdmin.email = params.email
      newAdmin.password = newAdmin.generateHash(params.password)
      return new Promise((resolve, reject) => {
        newAdmin.save((err, admin) => {
          if (err) {
            reject(err)
          } else {
            resolve(admin)
          }
        })
      })
    }
  },
  updateAdmin: {
    type: AdminType,
    args: {
      _id: {
        type: GraphQLString
      },
      name: {
        type: GraphQLString
      },
      email: {
        type: GraphQLString
      },
      password: {
        type: GraphQLString
      }
    },
    resolve: (root, params, options) => {
      const {_id, name, email, password} = params
      return new Promise((resolve, reject) => {
        Admin.findOne({ _id })
                .exec((err, admin) => {
                  if (err) {
                    reject(err)
                  } else {
                    admin.name = name
                    admin.email = email
                    admin.password = password
                    admin.save((err, admin) => {
                      if (err) {
                        reject(err)
                      } else {
                        resolve(admin)
                      }
                    })
                  }
                })
      })
    }
  }
}
