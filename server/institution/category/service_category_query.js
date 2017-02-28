import {
  GraphQLList
} from 'graphql'
import { ServiceCat } from '../../models'
import ServiceCatType from './service_category_type'

export default {
  category: {
    type: new GraphQLList(ServiceCatType),
    resolve: (root, params, options) => {
      return new Promise((resolve, reject) => {
        ServiceCat.find({})
                  .exec((err, category) => {
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
