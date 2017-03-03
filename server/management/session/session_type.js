import {
  GraphQLString,
  GraphQLObjectType
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
    timePeriod: {
      type: GraphQLString
    },
    instructor: {
      type: StaffType
    },
    room: {
      type: RoomType
    }
  }
})

