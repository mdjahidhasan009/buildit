import {model, Schema} from "mongoose";

const designSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    components: {
        type: Array,
        default: []
    },
    imageUrl: {
        type: String,
        default: ''
    }
}, { timestamps: true });

module.exports = model('Design', designSchema);