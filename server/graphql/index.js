import {
  GraphQLSchema,
  GraphQLObjectType
} from 'graphql'

// Get all graphQL Query types
import InstitutionQuery from '../institution/general/institution_info_query'
import OfferQuery from '../institution/offer/offer_query'
import SessionQuery from '../management/session/session_query'
import ProductQuery from '../service/product_query'
import StudentQuery from '../management/student/student_query'
import RoomQuery from '../institution/room/room_query'
import StaffQuery from '../management/staff/staff_query'
import ServiceCatQuery from '../institution/category/service_category_query'
import PositionQuery from '../institution/position/position_query'
import ExpenditureTypesQuery from '../institution/expenditure_type/expenditure_types_query'

// Get all graphQL mutation types
import OfferMutation from '../institution/offer/offer_mutation'
import InstitutionMutation from '../institution/general/institution_info_mutation'
import ServiceCatMutation from '../institution/category/service_category_mutation'
import ProductMutation from '../service/product_mutation'
import RoomMutation from '../institution/room/room_mutation'
import StaffMutation from '../management/staff/staff_mutation'
import SessionMutation from '../management/session/session_mutation'
import StudentMutation from '../management/student/student_mutation'
import PositionMutation from '../institution/position/position_mutation'
import ExpenditureTypesMutation from '../institution/expenditure_type/expenditure_types_mutation'

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
      ...ServiceCatQuery,
      ...PositionQuery,
      ...ExpenditureTypesQuery
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
      ...StudentMutation,
      ...PositionMutation,
      ...ExpenditureTypesMutation
    }
  })
})

