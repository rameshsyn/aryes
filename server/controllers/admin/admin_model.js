import bcrypt from 'bcrypt'
export default function (mongoose) {
  const Schema = mongoose.Schema
  const AdminSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    preferences: Array
  })
  AdminSchema.methods.generateHash = (password) => {
    return bcrypt.hashSync(password, 10)
  }
  AdminSchema.methods.compareWithHash = (password, hash) => {
    return bcrypt.compareSync(password, hash)
  }
  return mongoose.model('admin', AdminSchema)
}
