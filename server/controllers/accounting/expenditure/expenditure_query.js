import { Expenditure } from '../../../models'
import ExpenditureType from './expenditure_type'
import {
  GraphQLList
} from 'graphql'

export default {
  expenditure: {
    type: new GraphQLList(ExpenditureType),
    resolve: (root, params, options) => {
      return new Promise((resolve, reject) => {
        Expenditure.find({})
                .populate('type')
                .exec((err, expenditure) => {
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

