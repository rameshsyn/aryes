import { Session } from '../../../models'

export default function (sessionType, { GraphQLString, GraphQLList }) {
  return {
    session: {
      type: new GraphQLList(sessionType),
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
}
