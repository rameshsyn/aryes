import {
  GraphQLString,
  GraphQLObjectType,
  GraphQLInt
} from 'graphql'
import ServiceCatType from '../institution/category/service_category_type'
export default new GraphQLObjectType({
  name: 'product',
  description: 'product list',
  fields: {
    id: {
      type: GraphQLString,
      description: 'product id'
    },
    name: {
      type: GraphQLString,
      description: 'product name'
    },
    description: {
      type: GraphQLString
    },
    cost: {
      type: GraphQLInt,
      description: 'product cost'
    },
    category: {
      type: ServiceCatType,
      description: 'product category'
    },
    date_created: {
      type: GraphQLString,
      description: 'A product created date'
    }
  }
})
