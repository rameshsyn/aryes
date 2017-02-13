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
import sessionQuery from './management/session_query'

// Get types
import {
  SessionType
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
const SessionQuery = sessionQuery(SessionType, builtInTypes)

// Make available all the query types a single object
export default {
  ...SessionQuery
}
