export default function ({ GraphQLObjectType, GraphQLString }) {
  return new GraphQLObjectType({
    name: 'Session',
    description: 'A session list',
    fields: {
      time: {
        type: GraphQLString,
        description: 'A session time period'
      },
      instructor: {
        type: GraphQLString,
        description: 'An instructor for a session'
      }
    }
  })
}
