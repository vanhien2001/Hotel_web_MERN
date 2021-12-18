const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoose_delete = require('mongoose-delete');

const Room = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        typeRoom: {
            type: Schema.Types.ObjectId,
            ref: 'typerooms',
        },
        description: { type: String },
        images: { type: [String]},
        size: { type: Number },
        bed: { type: Number },
        price: { type: Number },
        services: { type: [Schema.Types.ObjectId] },
    },
    {
        timestamps: true,
    }
)

Room.plugin(mongoose_delete, {
    deletedAt: true
})

module.exports = mongoose.model('Room', Room)
