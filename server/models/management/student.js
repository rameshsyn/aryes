export default function (mongoose) {
  const Schema = mongoose.Schema
  const StudentSchema = new Schema({
    basic_info: {
      name: {
        type: String,
        required: true
      },
      address: String,
      school_name: String,
      academic_level: String
    },
    contact_info: {
      phone_num: {
        type: String,
        required: true
      },
      email: String
    },
    enrollment_info: {
      date: {
        type: Date,
        required: true
      },
      services: [{
        service_id: String
      }],
      sessions: [{
        session_id: String
      }],
      rooms: [{
        room_id: String
      }]
    },
    payment_info: {
      done: Boolean,
      installments: [{
        date: Date,
        amount: Number
      }],
      offers: [String],
      discount: Number
    }
  })
  return mongoose.model('student', StudentSchema)
}
