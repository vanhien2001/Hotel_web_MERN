const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoose_delete = require('mongoose-delete');

const User = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        firstname: {
            type: String,
        },
        lastname: {
            type: String,
        },
        address: {
            type: String,
        },
        cmnd: {
            type: String,
        },
        phone: {
            type: String,
        },
        gender: {
            type: String,
            enum: ['Male', 'Female','Other'],
        },
        email: {
            type: String,
        }
    },
    {
        timestamps: true,
    }
)

User.plugin(mongoose_delete, {
    deletedAt: true
})

module.exports = mongoose.model('users', User)
