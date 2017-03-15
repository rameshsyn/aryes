import {
  GraphQLString,
  GraphQLObjectType,
  GraphQLInt
} from 'graphql'

import ExpenditureTypesType from '../../institution/expenditure_type/expenditure_types_type'
export default new GraphQLObjectType({
  name: 'expenditure',
  description: 'A expenditure list',
  fields: {
    id: {
      type: GraphQLString
    },
    date: {
      type: GraphQLString
    },
    purpose: {
      type: GraphQLString
    },
    amount: {
      type: GraphQLInt
    },
    type: {
      type: ExpenditureTypesType
    },
    by: {
      type: GraphQLString
    }
  }
})

