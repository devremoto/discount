const mongoose = require('mongoose');

const schema = mongoose.model(
  'specialdate',
  {
    description: String,
    discount: Number,
    date: Date
  },
  'specialdate'
);
module.exports = schema;
