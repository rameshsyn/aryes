import { Institution } from '../models'
import ContactType from './contact_type'

export default {
  contact: {
    type: ContactType,
    resolve: (root, params, options) => {
      // find offer as argument if argument is specified
      const query = params.id ? { _id: params.id } : {}
      return new Promise((resolve, reject) => {
        resolve({
          phone: '4545154545',
          email: 'fasdfasdfsadfd@fjdkjf.com'
        })
      })
    }
  }
}

