const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoose_delete = require('mongoose-delete');

const Staff = new Schema(
    {
        position:{
            type: Schema.Types.ObjectId,
            require: true,
            ref: 'jobs',
        },
        salary:{
            type: Number,
            require: true,
        },
        idUser:{
            type: Schema.Types.ObjectId,
            ref: 'users'
        }
    },
    {
        timestamps: true,
    }
)

Staff.plugin(mongoose_delete, {
    deletedAt: true
})

module.exports = mongoose.model('Staff', Staff)