import {
  GraphQLString,
  GraphQLObjectType
} from 'graphql'

export default new GraphQLObjectType({
  name: 'expenditure_type',
  description: 'A Expediture types list',
  fields: {
    id: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    },
    label: {
      type: GraphQLString
    }
  }
})

