import { GraphQLList } from 'graphql'
import { ExpenditureTypes } from '../../../models'
import ExpenditureTypesType from './expenditure_types_type'

export default {
  expenditureTypes: {
    type: new GraphQLList(ExpenditureTypesType),
    resolve: (root, params, options) => {
      return new Promise((resolve, reject) => {
        ExpenditureTypes.find({})
            .exec((err, expenditureTypes) => {
              if (err) {
                reject(err)
              } else {
                resolve(expenditureTypes)
              }
            })
      })
    }
  }
}
