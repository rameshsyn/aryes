import { Institution } from '../../../models'
import InstitutionType from './institution_info_type'
import { GraphQLString } from 'graphql'

export default {
  updateInstitutionInfo: {
    type: InstitutionType,
    args: {
      name: {
        type: GraphQLString
      },
      location: {
        type: GraphQLString
      },
      email: {
        type: GraphQLString
      },
      phone: {
        type: GraphQLString
      }
    },
    resolve: (root, params, options) => {
      return new Promise((resolve, reject) => {
        Institution.findOne({}, (err, info) => {
          if (err) {
            reject(err)
          } else {
            if (!info) {
              new Institution(params).save((err, institution) => {
                if (err) {
                  reject(err)
                } else {
                  resolve(institution)
                }
              })
            } else {
              info.name = params.name
              info.location = params.location
              info.contact = {
                email: params.email,
                phone: params.phone
              }
              info.save((err) => {
                if (err) {
                  reject(err)
                } else {
                  resolve(info)
                }
              })
            }
          }
        })
      })
    }
  }
}

