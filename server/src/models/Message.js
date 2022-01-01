const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Message = new Schema(
    {
        conversation: {
            type: Schema.Types.ObjectId,
            ref: 'conversations',
            required: true
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'users',
            required: true
        },
        content: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Message', Message);