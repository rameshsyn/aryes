import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLList,
  GraphQLNonNull
} from 'graphql'

// Get types
import sessionType from './management/session_type'
import offerType from './service/offer_type'
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

// pass all imports as object to types
const SessionType = sessionType(builtInTypes)
const OfferType = offerType(builtInTypes)

// make available all the types
export {
  SessionType,
  OfferType
}
