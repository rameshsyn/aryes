export default function (mongoose) {
  const Schema = mongoose.Schema
  const InquirySchema = new Schema({
    name: String,
    date: Date,
    academic_level: String,
    services: [{
      type: Schema.Types.ObjectId,
      ref: 'product'
    }],
    available_time: [String],
    contact: String,
    status: {
      fixed: Boolean,
      informed: Number
    }
  })
  return mongoose.model('inquiry', InquirySchema)
}
