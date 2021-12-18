const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoose_delete = require('mongoose-delete');

const TypeRoom = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

TypeRoom.plugin(mongoose_delete, {
    deletedAt: true
})

module.exports = mongoose.model('TypeRoom', TypeRoom)
