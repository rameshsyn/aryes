import { Session } from '../../../models'
import SessionType from './session_type'
import {
  GraphQLList,
  GraphQLString,
  GraphQLBoolean
} from 'graphql'

export default {
  session: {
    type: new GraphQLList(SessionType),
    args: {
      _id: {
        type: GraphQLString
      },
      active: {
        type: GraphQLBoolean
      },
      timePeriod: {
        type: GraphQLString
      }
    },
    resolve: (root, params, options) => {
      return new Promise((resolve, reject) => {
        Session.find(params)
                .populate('instructor')
                .populate('room')
                .populate('students')
                .populate('product')
                .exec((err, session) => {
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

