export default function (mongoose) {
  const Schema = mongoose.Schema
  const ExpenditureSchema = new Schema({
    date: Date,
    type: {
      type: Schema.Types.ObjectId,
      ref: 'expendituretype'
    },
    purpose: String,
    amount: Number,
    by: String
  })
  return mongoose.model('expenditure', ExpenditureSchema)
}
