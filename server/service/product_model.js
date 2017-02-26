export default function (mongoose) {
  const Schema = mongoose.Schema
  const ServiceSchema = new Schema({
    name: String,
    description: String,
    cost: Number,
    category: {
      type: Schema.Types.ObjectId,
      ref: 'servicecat'
    },
    date_created: Date
  })
  return mongoose.model('product', ServiceSchema)
}
