import { Institution } from '../models'
import ServiceCatType from './service_category_type'

export default {
  service_category: {
    type: ServiceCatType,
    resolve: (root, params, options) => {
      // find offer as argument if argument is specified
      const query = params.id ? { _id: params.id } : {}
      return new Promise((resolve, reject) => {
        resolve({
          name: 'something',
          description: 'some description'
        })
      })
    }
  }
}

