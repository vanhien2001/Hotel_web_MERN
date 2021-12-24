const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Comment = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'users',
            required: true
        },
        room: {
            type: Schema.Types.ObjectId,
            ref: 'rooms',
            required: true
        },
        parentComment:{
            type: Schema.Types.ObjectId,
            ref: 'comments'
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

module.exports = mongoose.model('Comment', Comment);