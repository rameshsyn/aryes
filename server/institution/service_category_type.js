import {
  GraphQLString,
  GraphQLObjectType
} from 'graphql'

export default new GraphQLObjectType({
  name: 'service_category',
  description: 'Category Information',
  fields: {
    id: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString,
      description: 'Name of Category'
    },
    description: {
      type: GraphQLString,
      description: 'Category description'
    }
  }
})
