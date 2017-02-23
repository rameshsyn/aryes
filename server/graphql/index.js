import {
  GraphQLSchema,
  GraphQLObjectType
} from 'graphql'

// Get all graphQL Query types
import InstitutionQuery from '../institution/institution_info_query'
import OfferQuery from '../service/offer_query'
import SessionQuery from '../management/session_query'

// Get all graphQL mutation types
import OfferMutation from '../service/offer_mutation'

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQuery',
    description: 'A root query',
    fields: {
      ...SessionQuery,
      ...InstitutionQuery,
      ...OfferQuery
    }
  }),
  mutation: new GraphQLObjectType({
    name: 'RootMutation',
    description: 'A root mutation',
    fields: {
      ...OfferMutation
    }
  })
})

