export default function (mongoose) {
  const Schema = mongoose.Schema
  const OfferSchema = new Schema({
    code: {
      type: String,
      required: true
    },
    description: String,
    discount: {
      type: Number,
      required: true
    },
    date_created: Date,
    active: Boolean
  })
  return mongoose.model('offer', OfferSchema)
}
