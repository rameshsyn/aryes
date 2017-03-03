import {
  GraphQLString
} from 'graphql'
import { Session } from '../../models'
import SessionType from './session_type'

export default {
  addNewSession: {
    type: SessionType,
    args: {
      instructor: {
        type: GraphQLString
      },
      timePeriod: {
        type: GraphQLString
      },
      room: {
        type: GraphQLString
      },
      name: {
        type: GraphQLString
      }
    },
    resolve: (root, params, options) => {
      return new Promise((resolve, reject) => {
        new Session(params).save((err, session) => {
          if (err) {
            reject(err)
          } else {
            resolve(session)
          }
        })
      })
    }
  }
}
