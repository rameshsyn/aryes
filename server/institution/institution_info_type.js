import {
  GraphQLString,
  GraphQLObjectType
} from 'graphql'

import ContactQuery from './contact_query'
import ServiceCatQuery from './service_category_query'

export default new GraphQLObjectType({
  name: 'institution_info',
  description: 'Institution Information',
  fields: {
    name: {
      type: GraphQLString,
      description: 'A name of an institution'
    },
    location: {
      type: GraphQLString,
      description: 'Location of an institution'
    },
    ...ContactQuery,
    ...ServiceCatQuery
  }
})

