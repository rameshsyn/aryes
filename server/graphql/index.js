import {
  GraphQLSchema,
  GraphQLObjectType
} from 'graphql'

// Get all graphQL Query types
import InstitutionQuery from '../controllers/institution/general/institution_info_query'
import OfferQuery from '../controllers/institution/offer/offer_query'
import SessionQuery from '../controllers/management/session/session_query'
import ProductQuery from '../controllers/service/product_query'
import StudentQuery from '../controllers/management/student/student_query'
import RoomQuery from '../controllers/institution/room/room_query'
import StaffQuery from '../controllers/management/staff/staff_query'
import ServiceCatQuery from '../controllers/institution/category/service_category_query'
import PositionQuery from '../controllers/institution/position/position_query'
import ExpenditureTypesQuery from '../controllers/institution/expenditure_type/expenditure_types_query'
import InquiryQuery from '../controllers/management/inquiry/inquiry_query'
import ExpenditureQuery from '../controllers/accounting/expenditure/expenditure_query'
import AdminQuery from '../controllers/admin/admin_query'

// Get all graphQL mutation types
import OfferMutation from '../controllers/institution/offer/offer_mutation'
import InstitutionMutation from '../controllers/institution/general/institution_info_mutation'
import ServiceCatMutation from '../controllers/institution/category/service_category_mutation'
import ProductMutation from '../controllers/service/product_mutation'
import RoomMutation from '../controllers/institution/room/room_mutation'
import StaffMutation from '../controllers/management/staff/staff_mutation'
import SessionMutation from '../controllers/management/session/session_mutation'
import StudentMutation from '../controllers/management/student/student_mutation'
import PositionMutation from '../controllers/institution/position/position_mutation'
import ExpenditureTypesMutation from '../controllers/institution/expenditure_type/expenditure_types_mutation'
import InquiryMutation from '../controllers/management/inquiry/inquiry_mutation'
import ExpenditureMutation from '../controllers/accounting/expenditure/expenditure_mutation'
import AdminMutation from '../controllers/admin/admin_mutation'

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
      ...ExpenditureTypesQuery,
      ...InquiryQuery,
      ...ExpenditureQuery,
      ...AdminQuery
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
      ...ExpenditureTypesMutation,
      ...InquiryMutation,
      ...ExpenditureMutation,
      ...AdminMutation
    }
  })
})

