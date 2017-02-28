import {
  GraphQLString,
  GraphQLObjectType,
  GraphQLInt
} from 'graphql'

export default new GraphQLObjectType({
  name: 'room',
  description: 'A room list',
  fields: {
    id: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    },
    studentComp: {
      type: GraphQLInt
    }
  }
})

