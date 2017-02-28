import mongoose from 'mongoose'

// Configuration
import config from '../config/index.json'

// mongoose schemas
import student from '../management/student/student_model'
import session from '../management/session/session_model'
import inquiry from '../management/inquiry/inquiry_model'
import staff from '../management/staff/staff_model'
import product from '../service/product_model'
import admin from '../admin/admin_model'
import institution from '../institution/general/institution_info_model'
import serviceCat from '../institution/category/service_category_model'
import position from '../institution/position/position_model'
import room from '../institution/room/room_model'
import offer from '../institution/offer/offer_model'
import expenditureTypes from '../institution/expenditure_type/expenditure_types_model'

// MongoDB connection
mongoose.connect(`mongodb://localhost:27017/${config.db.name}`)

// Use native promises
mongoose.Promise = global.Promise

// Pass mongoose to all schemas
const Student = student(mongoose)
const Session = session(mongoose)
const Inquiry = inquiry(mongoose)
const Room = room(mongoose)
const Staff = staff(mongoose)
const Offer = offer(mongoose)
const Product = product(mongoose)
const Institution = institution(mongoose)
const Admin = admin(mongoose)
const ServiceCat = serviceCat(mongoose)
const Position = position(mongoose)
const ExpenditureTypes = expenditureTypes(mongoose)

export {
  Student,
  Session,
  Inquiry,
  Room,
  Staff,
  Offer,
  Product,
  Institution,
  Admin,
  ServiceCat,
  Position,
  ExpenditureTypes
}
