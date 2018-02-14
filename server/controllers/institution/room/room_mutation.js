import { Room } from '../../../models'
import RoomType from './room_type'

export default {
  addNewRoom: {
    type: RoomType,
    args: RoomType.getFields(),
    resolve: (root, params, options) => {
      return new Promise((resolve, reject) => {
        new Room(params).save((err, room) => {
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
