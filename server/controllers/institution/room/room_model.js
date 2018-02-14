export default function (mongoose) {
  const Schema = mongoose.Schema
  const RoomSchema = new Schema({
    name: String,
    studentComp: Number
  })
  return mongoose.model('room', RoomSchema)
}
