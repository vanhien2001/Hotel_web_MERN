const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoose_delete = require('mongoose-delete');

const Service = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: { 
            type: String 
        },
        icon: { type: String},
        extraService: { type: Boolean , default: false },
        price: { type: Number },
    },
    {
        timestamps: true,
    }
)

Service.plugin(mongoose_delete, {
    deletedAt: true
})

module.exports = mongoose.model('Service', Service)