export default function (mongoose) {
  const Schema = mongoose.Schema
  const SessionSchema = new Schema({
    time: String,
    instructor: String,
    active_rooms: [{
      room_id: String,
      service_id: String
    }]
  })
  return mongoose.model('session', SessionSchema)
}
