export default function (mongoose) {
  const Schema = mongoose.Schema
  const AdminSchema = new Schema({
    name: String,
    username: String,
    email: String,
    password: String,
    preferences: Array
  })
  return mongoose.model('admin', AdminSchema)
}
