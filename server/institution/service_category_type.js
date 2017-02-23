import {
  GraphQLString,
  GraphQLObjectType
} from 'graphql'

export default new GraphQLObjectType({
  name: 'service_category_info',
  description: 'Category Information',
  fields: {
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