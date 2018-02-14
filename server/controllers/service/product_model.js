export default function (mongoose) {
  const Schema = mongoose.Schema
  const ServiceSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    description: String,
    cost: {
      type: Number,
      required: true
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'servicecat',
      required: true
    },
    date_created: {
      type: Date,
      required: true
    }
  })
  return mongoose.model('product', ServiceSchema)
}
