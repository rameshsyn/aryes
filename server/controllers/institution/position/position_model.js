export default function (mongoose) {
  const Schema = mongoose.Schema
  const PositionSchema = new Schema({
    name: String,
    description: String
  })
  return mongoose.model('position', PositionSchema)
}

