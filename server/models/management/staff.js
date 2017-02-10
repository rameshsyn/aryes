export default function (mongoose) {
  const Schema = mongoose.Schema
  const StaffSchema = new Schema({
    name: String,
    contact: String,
    salary: [{
      service_id: String,
      amount: Number
    }],
    position: String
  })
  return mongoose.model('staff', StaffSchema)
}
