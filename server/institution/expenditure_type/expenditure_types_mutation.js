import { ExpenditureTypes } from '../../models'
import ExpenditureTypesType from './expenditure_types_type'

export default {
  addNewExpenditureTypes: {
    type: ExpenditureTypesType,
    args: ExpenditureTypesType.getFields(),
    resolve: (root, params, options) => {
      return new Promise((resolve, reject) => {
        new ExpenditureTypes(params).save((err, expenditureTypes) => {
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
