import { Session } from '../models'
import SessionType from './session_type'
import {
  GraphQLString,
  GraphQLList
} from 'graphql'

export default {
  session: {
    type: new GraphQLList(SessionType),
    args: {
      instructor: {
        type: GraphQLString,
        description: 'A name of a instructor'
      }
    },
    resolve: (root, params, options) => {
      return Session.find({'instructor': params.instructor}, (err, session) => {
        if (err) throw err
        return {
          time: session.time,
          instructor: session.instructor
        }
      })
    }
  }
}

