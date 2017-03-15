import {
  GraphQLString,
  GraphQLList
} from 'graphql'
import { Student } from '../../../models'
import StudentType from './student_type'

export default {
  student: {
    name: 'student',
    type: new GraphQLList(StudentType),
    args: {
      id: {
        type: GraphQLString
      }
    },
    resolve: (root, params, options) => {
      const query = params.id ? {_id: params.id} : {}
      return new Promise((resolve, reject) => {
        Student.find(query)
                .populate('enrollment_info.products')
                .populate('enrollment_info.sessions')
                .populate('payment_info.offers')
                .exec((err, student) => {
                  if (err) {
                    reject(err)
                  } else {
                    resolve(student)
                  }
                })
      })
    }
  }
}
