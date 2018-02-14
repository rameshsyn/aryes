export default function (mongoose) {
  const Schema = mongoose.Schema
  const ExpenditureTypeSchema = new Schema({
    name: String,
    label: String
  })
  return mongoose.model('expendituretype', ExpenditureTypeSchema)
}
