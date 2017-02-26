import {
  GraphQLString,
  GraphQLInt
} from 'graphql'
import { Product } from '../models'
import ProductType from './product_type'

export default {
  addNewProduct: {
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
      const newProduct = params
      newProduct.date_created = Date.now()
      return new Promise((resolve, reject) => {
        new Product(newProduct).save((err, product) => {
          if (err) {
            reject(err)
          } else {
            resolve(product)
          }
        })
      })
    }
  }
}

