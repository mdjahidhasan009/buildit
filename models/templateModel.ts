const { model, Schema } = require('mongoose');

const templateSchema = new Schema({
  components: {
    type: Array,
    required: true
  },
  imageUrl: {
    type: String,
    default: ''
  }
}, { timestamps: true });

module.exports = model('Template', templateSchema);