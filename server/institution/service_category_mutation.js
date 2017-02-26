import { ServiceCat } from '../models'
import ServiceCatType from './service_category_type'
import { GraphQLString } from 'graphql'

export default {
  addNewCategory: {
    type: ServiceCatType,
    args: {
      id: {
        type: GraphQLString
      },
      name: {
        type: GraphQLString
      },
      description: {
        type: GraphQLString
      }
    },
    resolve: (root, params, options) => {
      return new Promise((resolve, reject) => {
        new ServiceCat(params).save((err, category) => {
          if (err) {
            reject(err)
          } else {
            resolve(category)
          }
        })
      })
    }
  }
}

