import {
  GraphQLString,
  GraphQLObjectType,
  GraphQLInt
} from 'graphql'
import StaffType from '../staff/staff_type'
import RoomType from '../../institution/room/room_type'

export default new GraphQLObjectType({
  name: 'session',
  description: 'A session list',
  fields: {
    id: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    },
    time: {
      type: new GraphQLObjectType({
        name: 'time_interval',
        fields: {
          start: {
            type: GraphQLInt
          },
          end: {
            type: GraphQLInt
          },
          peroid: {
            type: GraphQLString
          }
        }
      })
    },
    instructor: {
      type: StaffType
    },
    room: {
      type: RoomType
    }
  }
})

