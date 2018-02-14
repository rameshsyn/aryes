import {
  GraphQLString,
  GraphQLInt,
  GraphQLList
} from 'graphql'
import { Student } from '../../../models'
import StudentType from './student_type'

export default {
  addNewStudent: {
    type: StudentType,
    args: {
      name: {
        type: GraphQLString
      },
      academic_level: {
        type: GraphQLString
      },
      school: {
        type: GraphQLString
      },
      address: {
        type: GraphQLString
      },
      phone: {
        type: GraphQLString
      },
      email: {
        type: GraphQLString
      },
      date: {
        type: GraphQLString
      },
      products: {
        type: new GraphQLList(GraphQLString)
      },
      sessions: {
        type: new GraphQLList(GraphQLString)
      },
      offers: {
        type: new GraphQLList(GraphQLString)
      }
    },
    resolve: (root, params, options) => {
      const newStudent = {
        basic_info: {
          name: params.name,
          academic_level: params.academic_level,
          school: params.school,
          address: params.address
        },
        contact_info: {
          phone: params.phone,
          email: params.email
        },
        enrollment_info: {
          date: params.date,
          products: params.products,
          sessions: params.sessions
        },
        payment_info: {
          offers: params.offers
        }
      }
      return new Promise((resolve, reject) => {
        new Student(newStudent).save((err, student) => {
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
