import {
  GraphQLString,
  GraphQLInt
} from 'graphql'
import { Expenditure } from '../../models'
import ExpenditureType from './expenditure_type'

export default {
  addNewExpenditure: {
    type: ExpenditureType,
    args: {
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
        type: GraphQLString
      },
      by: {
        type: GraphQLString
      }
    },
    resolve: (root, params, options) => {
      return new Promise((resolve, reject) => {
        new Expenditure(params).save((err, expenditure) => {
          if (err) {
            reject(err)
          } else {
            resolve(expenditure)
          }
        })
      })
    }
  }
}
