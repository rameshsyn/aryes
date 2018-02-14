import {
  GraphQLString,
  GraphQLObjectType
} from 'graphql'

export default new GraphQLObjectType({
  name: 'position',
  description: 'Position Information',
  fields: {
    id: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    }
  }
})
