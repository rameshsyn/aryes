import { Institution } from '../../models'
import InstitutionType from './institution_info_type'

export default {
  institution_info: {
    type: InstitutionType,
    resolve: (root, params, options) => {
      return new Promise((resolve, reject) => {
        Institution.findOne({}, (err, institution) => {
          if (err) {
            reject(err)
          } else {
            resolve(institution)
          }
        })
      })
    }
  }
}

