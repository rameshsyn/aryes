import { ServiceCat } from '../../models'
import ServiceCatType from './service_category_type'
import { GraphQLString } from 'graphql'

export default {
  addNewCategory: {
    type: ServiceCatType,
    args: {
      name: {
        type: GraphQLString
      },
      label: {
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
  },
  updateCategory: {
    type: ServiceCatType,
    args: {
      id: {
        type: GraphQLString
      },
      name: {
        type: GraphQLString
      },
      label: {
        type: GraphQLString
      },
      description: {
        type: GraphQLString
      }
    },
    resolve: (root, params, options) => {
      const { id, name, label, description } = params
      return new Promise((resolve, reject) => {
        ServiceCat.findOne({_id: id})
                  .exec((err, category) => {
                    if (err) {
                      reject(err)
                    } else {
                      category.name = name
                      category.label = label
                      category.description = description
                      category.save((err, category) => {
                        if (err) {
                          reject(err)
                        } else {
                          resolve(category)
                        }
                      })
                    }
                  })
      })
    }
  }
}

