import {
  GraphQLString,
  GraphQLObjectType,
  GraphQLBoolean
} from 'graphql'
import StaffType from '../staff/staff_type'
import RoomType from '../../institution/room/room_type'
import ProductType from '../../service/product_type'

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
    product: {
      type: ProductType
    },
    instructor: {
      type: StaffType
    },
    room: {
      type: RoomType
    },
    active: {
      type: GraphQLBoolean
    },
    students: {
      type: new GraphQLObjectType({
        name: 'session_student',
        fields: {
          id: {
            type: GraphQLString
          }
        }
      })
    }
  }
})

