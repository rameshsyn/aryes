export default function (mongoose) {
  const Schema = mongoose.Schema
  const StudentSchema = new Schema({
    basic_info: {
      name: {
        type: String
      },
      address: String,
      school: String,
      academic_level: String
    },
    contact_info: {
      phone: {
        type: String
      },
      email: String
    },
    enrollment_info: {
      date: {
        type: Date
      },
      products: [{
        type: Schema.Types.ObjectId,
        ref: 'product'
      }],
      sessions: [{
        type: Schema.Types.ObjectId,
        ref: 'session'
      }]
    },
    payment_info: {
      done: Boolean,
      installments: [{
        date: Date,
        amount: Number
      }],
      offers: [{
        type: Schema.Types.ObjectId,
        ref: 'offer'
      }],
      discount: Number
    }
  })
  return mongoose.model('student', StudentSchema)
}
