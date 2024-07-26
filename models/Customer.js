const mongoose = require('mongoose');
const { autoIncrement } = require('mongoose-plugin-autoinc');

const customerSchema = new mongoose.Schema({
  phone: { type: String },
  name: { type: String },
  address: { type: String },
});

customerSchema.plugin(autoIncrement, {
  model: 'customer',
  field: '_id',
  startAt: 1,
});

module.exports = Customer = mongoose.model('customer', customerSchema);
