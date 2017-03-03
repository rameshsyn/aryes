import {
  GraphQLString,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLList
} from 'graphql'

import ProductType from '../../service/product_type'
export default new GraphQLObjectType({
  name: 'inquiry',
  description: 'A inquiry list',
  fields: {
    id: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    },
    date: {
      type: GraphQLString
    },
    academic_level: {
      type: GraphQLString
    },
    contact: {
      type: GraphQLString
    },
    services: {
      type: new GraphQLList(ProductType)
    },
    available_time: {
      type: new GraphQLList(GraphQLString)
    },
    status: {
      type: new GraphQLObjectType({
        name: 'status',
        fields: {
          fixed: {
            type: GraphQLBoolean
          },
          informed: {
            type: GraphQLInt
          }
        }
      })
    }
  }
})

