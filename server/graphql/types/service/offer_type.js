export default function ({ GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLBoolean }) {
  return new GraphQLObjectType({
    name: 'offer',
    description: 'A list of offer',
    fields: {
      code: {
        type: GraphQLString,
        description: 'A code for particular offer'
      },
      description: {
        type: GraphQLString,
        description: 'An offer explanation'
      },
      discount: {
        type: GraphQLInt,
        description: 'Discount percentage for the offer'
      },
      active: {
        type: GraphQLBoolean,
        description: 'A status of offer'
      },
      date_created: {
        type: GraphQLString,
        description: 'A date when offer is created'
      }
    }
  })
}
