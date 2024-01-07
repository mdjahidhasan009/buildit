const mongoose = require('mongoose');

const { model, Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  image: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

module.exports = model('User', userSchema);