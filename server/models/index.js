import mongoose from 'mongoose'

// Configuration
import config from '../config'

// mongoose schemas
import student from './management/student'
import session from './management/session'
import inquiry from './management/inquiry'
import room from './management/room'
import staff from './management/staff'
import offer from './service/offer'
import service from './service/service_info'
import institution from './institution/institution_info'
import admin from './admin/admin'

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
const Service = service(mongoose)
const Institution = institution(mongoose)
const Admin = admin(mongoose)

// new Institution({
//   name: 'fdsf',
//   contact: [{
//     email: 'exa@fjk.com',
//     phone: '5435345',
//     social_links: ['aryes']
//   }],
//   location: 'bhaktapur'
// }).save((err) => {
//   if (err) throw err
//   console.log('saved')
// })

// new Service({
//   category: 'tuition',
//   services: [{
//     id: 'ff',
//     name: 'class 10',
//     description: 'jfkjdlsjfkjdkljf',
//     cost: 600,
//     category: 'tuition'
//   }]
// }).save((err) => {
//   if (err) throw err
//   console.log('saved')
// })

// new Offer({
//   code: 'CONNECTION',
//   discount: 60,
//   date_created: Date.now(),
//   active: false,
//   description: 'An offer for a relative'
// }).save((err) => {
//   if (err) throw err
//   console.log('saved')
//  })

// new Staff({
//   name: 'ramesh',
//   contact: '6454645465',
//   salary: [{
//     service_id: '4343',
//     amount: 45454
//   }],
//   position: 'teacher'
// }).save((err) => {
//   if (err) throw err
//   console.log('saved')
// })

// new Room({
//   name: 'nice room'
// }).save((err) => {
//   if (err) throw err
//   console.log('saved')
// })

// new Inquiry({
//   name: 'ramesh',
//   address: 'nepal',
//   academic_level: 'bachelor',
//   services: [],
//   available_time: ['5-8'],
//   contact: '44545454545',
//   remarks: 'fixed'
// }).save((err) => {
//   if (err) throw err
//   console.log('saved')
// })

// new Session({
//   time: '5-7',
//   instructor: 'ramesh',
//   active_rooms: [{
//     room_id: 'id1',
//     service_id: 'id3'
//   }]
// }).save((err) => {
//   if (err) throw err
//   console.log('saved')
// })

// new Student({
//   basic_info: {
//     name: 'ramesh syangtan',
//     address: 'bhaktapur',
//     school_name: 'sanothimi',
//     academic_level: 'bachelor'
//   },
//   contact_info: {
//     phone_num: '9843578426',
//     email: 'rameshsyangtan92@gmail.com'
//   },
//   enrollment_info: {
//     date: Date.now(),
//     services: [],
//     sessions: [],
//     rooms: []
//   },
//   payment_info: {
//     done: true,
//     installments: [{
//       date: Date.now(),
//       amount: 1200
//     }],
//     offers: [],
//     discount: 0
//   }
// }).save((err) => {
//   if (err) throw err
//   console.log('saved')
// })

export {
  Student,
  Session,
  Inquiry,
  Room,
  Staff,
  Offer,
  Service,
  Institution,
  Admin
}
