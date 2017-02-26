import { GraphQLList } from 'graphql'
import { Room } from '../../models'
import RoomType from './room_type'

export default {
  room: {
    type: new GraphQLList(RoomType),
    resolve: (root, params, options) => {
      return new Promise((resolve, reject) => {
        Room.find({})
            .exec((err, room) => {
              if (err) {
                reject(err)
              } else {
                resolve(room)
              }
            })
      })
    }
  }
}
