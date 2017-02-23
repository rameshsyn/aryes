export default function (mongoose) {
  const Schema = mongoose.Schema
  const RoomSchema = new Schema({
    name: String
  })
  return mongoose.model('room', RoomSchema)
}
