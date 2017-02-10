export default function (mongoose) {
  const Schema = mongoose.Schema
  const OfferSchema = new Schema({
    name: String,
    discount: Number
  })
  return mongoose.model('offer', OfferSchema)
}
