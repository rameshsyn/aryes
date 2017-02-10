export default function (mongoose) {
  const Schema = mongoose.Schema
  const InquirySchema = new Schema({
    name: String,
    address: String,
    academic_level: String,
    services: Array,
    available_time: [String],
    contact: String,
    remarks: String
  })
  return mongoose.model('inquiry', InquirySchema)
}
