import {
  GraphQLSchema,
  GraphQLObjectType
} from 'graphql'

// Get all graphQL Query types
import queries from './queries'

// Get all graphQL mutation types
import mutations from './mutations'

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQuery',
    description: 'A root query',
    fields: queries
  }),
  // mutation: new GraphQLObjectType({
  //   name: 'RootMutation',
  //   description: 'A root mutation'
  //   fields: mutations
  // })
})

