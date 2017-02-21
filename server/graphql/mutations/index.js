// Mutations

import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLList,
  GraphQLNonNull
} from 'graphql'

// Get particular query types
import offerMutation from './service/offer_mutation'

// Get types
import {
  OfferType
} from '../types'

// hold all imports
const builtInTypes = {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLList,
  GraphQLNonNull
}

// Send custom and built in types to query types
const OfferMutation = offerMutation(OfferType, builtInTypes)

// Make available all the query types a single object
export default {
  ...OfferMutation
}

