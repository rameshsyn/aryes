import { GraphQLList } from 'graphql'
import { Position } from '../../models'
import PositionType from './position_type'

export default {
  position: {
    type: new GraphQLList(PositionType),
    resolve: (root, params, options) => {
      return new Promise((resolve, reject) => {
        Position.find({}, (err, position) => {
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

