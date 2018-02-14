export default function (mongoose) {
  const Schema = mongoose.Schema
  const ServiceCatSchema = new Schema({
    name: String,
    label: String,
    description: String
  })
  return mongoose.model('servicecat', ServiceCatSchema)
}
