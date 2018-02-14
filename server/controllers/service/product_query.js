import { Product } from '../../models'
import ProductType from './product_type'
import {
  GraphQLList,
  GraphQLString
} from 'graphql'

export default {
  product: {
    type: new GraphQLList(ProductType),
    args: {
      id: {
        type: GraphQLString
      }
    },
    resolve: (root, params, options) => {
      const query = params.id ? {_id: params.id} : {}
      return new Promise((resolve, reject) => {
        Product.find(query)
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

