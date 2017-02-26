import { Session } from '../../models'
import SessionType from './session_type'
import {
  GraphQLList
} from 'graphql'

export default {
  session: {
    type: new GraphQLList(SessionType),
    resolve: (root, params, options) => {
      return new Promise((resolve, reject) => {
        Session.find({})
                .populate('staff')
                .populate('room')
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

