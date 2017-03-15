export default function (mongoose) {
  const Schema = mongoose.Schema
  const StaffSchema = new Schema({
    name: String,
    contact: String,
    salary: [{
      product_id: {
        type: Schema.Types.ObjectId,
        ref: 'product'
      },
      date: Date,
      amount: Number
    }],
    position: [{
      type: Schema.Types.ObjectId,
      ref: 'position'
    }]
  })
  return mongoose.model('staff', StaffSchema)
}
