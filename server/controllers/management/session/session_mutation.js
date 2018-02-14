import {
  GraphQLString,
  GraphQLNonNull,
  GraphQLBoolean
} from 'graphql'
import { Session } from '../../../models'
import SessionType from './session_type'

export default {
  addNewSession: {
    type: SessionType,
    args: {
      name: {
        type: new GraphQLNonNull(GraphQLString)
      },
      instructor: {
        type: new GraphQLNonNull(GraphQLString)
      },
      timePeriod: {
        type: new GraphQLNonNull(GraphQLString)
      },
      room: {
        type: new GraphQLNonNull(GraphQLString)
      },
      product: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: (root, params, options) => {
      // New session is treated as an active one
      params.active = true
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
  },
  updateSession: {
    type: SessionType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString)
      },
      name: {
        type: new GraphQLNonNull(GraphQLString)
      },
      instructor: {
        type: new GraphQLNonNull(GraphQLString)
      },
      timePeriod: {
        type: new GraphQLNonNull(GraphQLString)
      },
      room: {
        type: new GraphQLNonNull(GraphQLString)
      },
      product: {
        type: new GraphQLNonNull(GraphQLString)
      },
      active: {
        type: new GraphQLNonNull(GraphQLBoolean)
      }
    },
    resolve: (root, params, options) => {
      const {id, name, instructor, timePeriod, room, product, active} = params
      return new Promise((resolve, reject) => {
        Session.findOne({ _id: id })
                .exec((err, session) => {
                  if (err) {
                    reject(err)
                  } else {
                    session.name = name
                    session.instructor = instructor
                    session.timePeriod = timePeriod
                    session.room = room
                    session.product = product
                    session.active = active
                    session.save((err, session) => {
                      if (err) {
                        reject(err)
                      } else {
                        resolve(session)
                      }
                    })
                  }
                })
      })
    }
  },
  deleteSession: {
    type: SessionType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: (root, params, options) => {
      return new Promise((resolve, reject) => {
        Session.findOne({ _id: params.id })
                .exec((err, session) => {
                  if (err) {
                    reject(err)
                  } else {
                    session.remove((err) => {
                      if (err) {
                        reject(err)
                      } else {
                        resolve(session)
                      }
                    })
                  }
                })
      })
    }
  }
}
