import {
  GraphQLString,
  GraphQLObjectType,
  GraphQLList,
  GraphQLInt
} from 'graphql'

import PositionType from '../../institution/position/position_type'
export default new GraphQLObjectType({
  name: 'staff',
  description: 'A staff list',
  fields: {
    id: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    },
    contact: {
      type: GraphQLString
    },
    salary: {
      type: new GraphQLList(new GraphQLObjectType({
        name: 'staff_salary',
        fields: {
          product_id: {
            type: GraphQLString
          },
          date: {
            type: GraphQLString
          },
          amount: {
            type: GraphQLInt
          }
        }
      }))
    },
    position: {
      type: PositionType
    }
  }
})

