const { model, Schema } = require('mongoose');

const userImageSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  imageUrl: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = model('UserImage', userImageSchema);