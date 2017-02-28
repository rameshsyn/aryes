import { Position } from '../../models'
import PositionType from './position_type'
import { GraphQLString } from 'graphql'

export default {
  addNewPosition: {
    type: PositionType,
    args: {
      name: {
        type: GraphQLString
      },
      description: {
        type: GraphQLString
      }
    },
    resolve: (root, params, options) => {
      return new Promise((resolve, reject) => {
        new Position(params).save((err, position) => {
          if (err) {
            reject(err)
          } else {
            resolve(position)
          }
        })
      })
    }
  }
}

