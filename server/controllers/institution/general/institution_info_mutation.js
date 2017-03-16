import { Institution } from '../../../models'
import InstitutionType from './institution_info_type'
import {
  GraphQLString,
  GraphQLNonNull
} from 'graphql'

export default {
  updateInstitutionInfo: {
    type: InstitutionType,
    args: {
      name: {
        type: new GraphQLNonNull(GraphQLString)
      },
      location: {
        type: new GraphQLNonNull(GraphQLString)
      },
      email: {
        type: new GraphQLNonNull(GraphQLString)
      },
      phone: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: (root, params, options) => {
      return new Promise((resolve, reject) => {
        Institution.findOne({}, (err, info) => {
          if (err) {
            reject(err)
          } else {
            // Save instituition information for the first time
            if (!info) {
              const newInformation = {
                name: params.name,
                location: params.location,
                contact: {
                  email: params.email,
                  phone: params.phone
                }
              }
              new Institution(newInformation).save((err, institution) => {
                if (err) {
                  reject(err)
                } else {
                  resolve(institution)
                }
              })
            // Other wise update it
            } else {
              info.name = params.name
              info.location = params.location
              info.contact = {
                email: params.email,
                phone: params.phone
              }
              info.save((err, newInfo) => {
                if (err) {
                  reject(err)
                } else {
                  resolve(newInfo)
                }
              })
            }
          }
        })
      })
    }
  }
}

