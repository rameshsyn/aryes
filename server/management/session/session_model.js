export default function (mongoose) {
  const Schema = mongoose.Schema
  const SessionSchema = new Schema({
    name: String,
    timePeriod: String,
    instructor: {
      type: Schema.Types.ObjectId,
      ref: 'staff'
    },
    room: {
      type: Schema.Types.ObjectId,
      ref: 'room'
    },
    students: [{
      type: Schema.Types.ObjectId,
      ref: 'student'
    }],
    active: Boolean
  })
  return mongoose.model('session', SessionSchema)
}
