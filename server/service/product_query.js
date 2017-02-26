import { Product } from '../models'
import ProductType from './product_type'
import {
  GraphQLList
} from 'graphql'

export default {
  product: {
    type: new GraphQLList(ProductType),
    resolve: (root, params, options) => {
      return new Promise((resolve, reject) => {
        Product.find({})
                .populate('category')
                .exec((err, product) => {
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

