import {
  GraphQLObjectType,
  GraphQLString
} from 'graphql'

export default new GraphQLObjectType({
  name: 'contact_info',
  description: 'Contact Information',
  fields: {
    phone: {
      type: GraphQLString,
      description: 'Official phone number'
    },
    email: {
      type: GraphQLString,
      description: 'Email address'
    }
  }
})

