export default function (mongoose) {
  const Schema = mongoose.Schema
  const ServiceSchema = new Schema({
    category: String,
    services: [{
      id: String,
      name: String,
      description: String,
      cost: Number,
      category: String
    }]
  })
  return mongoose.model('service', ServiceSchema)
}
