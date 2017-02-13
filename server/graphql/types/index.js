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

// make available all the types
export {
  SessionType
}
