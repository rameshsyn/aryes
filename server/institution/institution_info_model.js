export default function (mongoose) {
  const Schema = mongoose.Schema
  const InstitutionSchema = new Schema({
    name: String,
    contact: [{
      email: String,
      phone: String
    }],
    location: String,
    sevice_category: [{
      name: String,
      description: String
    }]
  })
  return mongoose.model('institution', InstitutionSchema)
}

