import {
  GraphQLString,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLBoolean
} from 'graphql'

import ProductType from '../../service/product_type'
import SessionType from '../session/session_type'
import OfferType from '../../institution/offer/offer_type'
import PaymentType from '../../accounting/payment_type'

export default new GraphQLObjectType({
  name: 'student',
  description: 'student information',
  fields: {
    id: {
      type: GraphQLString
    },
    basic_info: {
      type: new GraphQLObjectType({
        name: 'basic_info',
        description: 'Basic student information',
        fields: {
          name: {
            type: GraphQLString
          },
          address: {
            type: GraphQLString
          },
          school: {
            type: GraphQLString
          },
          academic_level: {
            type: GraphQLString
          }
        }
      })
    },
    contact_info: {
      type: new GraphQLObjectType({
        name: 'contact_info',
        description: 'Student contact information',
        fields: {
          phone: {
            type: GraphQLString
          },
          email: {
            type: GraphQLString
          }
        }
      })
    },
    enrollment_info: {
      type: new GraphQLObjectType({
        name: 'enrollment_info',
        description: 'Student enrollment information',
        fields: {
          date: {
            type: GraphQLString
          },
          products: {
            type: new GraphQLList(ProductType)
          },
          sessions: {
            type: new GraphQLList(SessionType)
          }
        }
      })
    },
    payment_info: {
      type: new GraphQLObjectType({
        name: 'payment_info',
        description: 'Student payment information',
        fields: {
          done: {
            type: GraphQLBoolean
          },
          installments: {
            type: new GraphQLList(PaymentType)
          },
          offers: {
            type: new GraphQLList(OfferType)
          },
          discount: {
            type: GraphQLInt
          }
        }
      })
    }
  }
})
