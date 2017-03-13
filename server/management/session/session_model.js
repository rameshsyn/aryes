export default function (mongoose) {
  const Schema = mongoose.Schema
  const SessionSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    timePeriod: {
      type: String,
      required: true
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'product',
      required: true
    },
    instructor: {
      type: Schema.Types.ObjectId,
      ref: 'staff',
      required: true
    },
    room: {
      type: Schema.Types.ObjectId,
      ref: 'room',
      required: true
    },
    students: [{
      type: Schema.Types.ObjectId,
      ref: 'student'
    }],
    active: Boolean
  })
  return mongoose.model('session', SessionSchema)
}
