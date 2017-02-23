import { Institution } from '../models'
import InstitutionType from './institution_info_type'

export default {
  institution_info: {
    type: InstitutionType,
    resolve: (root, params, options) => {
      // find offer as argument if argument is specified
      const query = params.id ? { _id: params.id } : {}
      return new Promise((resolve, reject) => {
        resolve({
          name: 'something',
          location: 'bhaktapur'
        })
      })
    }
  }
}

