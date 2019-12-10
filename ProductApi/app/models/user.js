const mongoose = require('mongoose');

const schema = mongoose.model('user', {
  firstname: String,
  lastname: String,
  birthdate: Date
},'user');
module.exports = schema;
