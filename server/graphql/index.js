import {
  GraphQLSchema,
  GraphQLObjectType
} from 'graphql'

// Get all graphQL Query types
import InstitutionQuery from '../institution/institution_info_query'
import OfferQuery from '../service/offer_query'
import SessionQuery from '../management/session/session_query'
import ProductQuery from '../service/product_query'
import StudentQuery from '../management/student/student_query'
import RoomQuery from '../management/room/room_query'
import StaffQuery from '../management/staff/staff_query'
import ServiceCatQuery from '../institution/service_category_query'

// Get all graphQL mutation types
import OfferMutation from '../service/offer_mutation'
import InstitutionMutation from '../institution/institution_info_mutation'
import ServiceCatMutation from '../institution/service_category_mutation'
import ProductMutation from '../service/product_mutation'
import RoomMutation from '../management/room/room_mutation'
import StaffMutation from '../management/staff/staff_mutation'
import SessionMutation from '../management/session/session_mutation'
import StudentMutation from '../management/student/student_mutation'

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQuery',
    description: 'A root query',
    fields: {
      ...SessionQuery,
      ...InstitutionQuery,
      ...OfferQuery,
      ...ProductQuery,
      ...StudentQuery,
      ...RoomQuery,
      ...StaffQuery,
      ...ServiceCatQuery
    }
  }),
  mutation: new GraphQLObjectType({
    name: 'RootMutation',
    description: 'A root mutation',
    fields: {
      ...OfferMutation,
      ...InstitutionMutation,
      ...ServiceCatMutation,
      ...ProductMutation,
      ...RoomMutation,
      ...StaffMutation,
      ...SessionMutation,
      ...StudentMutation
    }
  })
})

