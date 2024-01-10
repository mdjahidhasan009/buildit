const { model, Schema } = require('mongoose');

const designImageSchema = new Schema({
  imageUrl: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = model('DesignImage', designImageSchema);