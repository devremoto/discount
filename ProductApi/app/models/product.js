const mongoose = require('mongoose');

const schema = mongoose.model(
  'product',
  {
    price: Number,
    title: String,
    description: String,
    discount: {
      pct: Number,
      value: Number,
      finalPrice: Number
    }
  },
  'product'
);
module.exports = schema;
