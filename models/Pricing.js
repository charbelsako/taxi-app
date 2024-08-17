const mongoose = require('mongoose');
const { autoIncrement } = require('mongoose-plugin-autoinc');

const pricingSchema = new mongoose.Schema(
  {
    from: String,
    to: String,
    price: Number,
    currency: String,
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

pricingSchema.plugin(autoIncrement, {
  model: 'pricing',
  field: '_id',
  startAt: 1,
});

module.exports = Pricing = mongoose.model('pricing', pricingSchema);
