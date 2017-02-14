export default function (mongoose) {
  const Schema = mongoose.Schema
  const OfferSchema = new Schema({
    code: String,
    description: String,
    discount: Number,
    date_created: Date,
    active: Boolean
  })
  return mongoose.model('offer', OfferSchema)
}
