import {
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull
} from 'graphql'
import { Product } from '../../models'
import ProductType from './product_type'

export default {
  addNewProduct: {
    type: ProductType,
    args: {
      name: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'product name'
      },
      description: {
        type: GraphQLString,
        description: 'product description'
      },
      cost: {
        type: new GraphQLNonNull(GraphQLInt),
        description: 'product cost'
      },
      category: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'product category'
      },
      date_created: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'product created date'
      }
    },
    resolve: (root, params, options) => {
      return new Promise((resolve, reject) => {
        new Product(params).save((err, product) => {
          if (err) {
            reject(err)
          } else {
            resolve(product)
          }
        })
      })
    }
  },
  updateProduct: {
    type: ProductType,
    args: {
      id: {
        type: GraphQLString,
        description: 'product id'
      },
      name: {
        type: GraphQLString,
        description: 'product name'
      },
      description: {
        type: GraphQLString
      },
      cost: {
        type: GraphQLInt,
        description: 'product cost'
      },
      category: {
        type: GraphQLString,
        description: 'product category'
      }
    },
    resolve: (root, params, options) => {
      const {name, cost, description, category} = params
      return new Promise((resolve, reject) => {
        Product.findOne({_id: params.id})
                .exec((err, product) => {
                  if (err) {
                    reject(err)
                  } else {
                    product.name = name
                    product.cost = cost
                    product.description = description
                    product.category = category
                    product.save((err, product) => {
                      if (err) {
                        reject(err)
                      } else {
                        resolve(product)
                      }
                    })
                  }
                })
      })
    }
  },
  deleteProduct: {
    type: ProductType,
    args: {
      id: {
        type: GraphQLString
      }
    },
    resolve: (root, params, options) => {
      return new Promise((resolve, reject) => {
        Product.findOne({_id: params.id})
                .exec((err, product) => {
                  if (err) {
                    reject(err)
                  } else {
                    product.remove((err) => {
                      if (err) {
                        reject(err)
                      } else {
                        resolve(product)
                      }
                    })
                  }
                })
      })
    }

  }
}

