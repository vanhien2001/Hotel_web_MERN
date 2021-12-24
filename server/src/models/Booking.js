const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoose_delete = require('mongoose-delete');

const Booking = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'users'
        },
        room: {
            type: Schema.Types.ObjectId,
            ref: 'rooms'
        },
        services: {
            type: [Schema.Types.ObjectId]
        },
        arrive: { type: Date },
        depart: { type: Date },
        totalPrice: { type: Number },
        payment: { type: String, required: true },
        payed: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    }
)

Booking.plugin(mongoose_delete, {
    deletedAt: true
})

module.exports = mongoose.model('Booking', Booking);