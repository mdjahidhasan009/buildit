const { model, Schema } = require('mongoose');

const backgroundImageSchema = new Schema({
  imageUrl: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = model('BackgroundImage', backgroundImageSchema);