import {
  GraphQLString,
  GraphQLInt
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
      timeStart: {
        type: GraphQLInt
      },
      timeEnd: {
        type: GraphQLInt
      },
      period: {
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
      const newSession = {
        name: params.name,
        instructor: params.instructor,
        time: {
          start: params.timeStart,
          end: params.timeEnd,
          period: params.period
        },
        room: params.room
      }
      return new Promise((resolve, reject) => {
        new Session(newSession).save((err, session) => {
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
