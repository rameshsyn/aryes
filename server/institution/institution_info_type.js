import {
  GraphQLString,
  GraphQLObjectType
} from 'graphql'

export default new GraphQLObjectType({
  name: 'institution_info',
  description: 'Institution Information',
  fields: {
    id: {
      type: GraphQLString,
      description: 'Unique id'
    },
    name: {
      type: GraphQLString,
      description: 'A name of an institution'
    },
    location: {
      type: GraphQLString,
      description: 'Location of an institution'
    },
    contact: {
      type: new GraphQLObjectType({
        name: 'institution_contact_info',
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
    }
  }
})

