const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoose_delete = require('mongoose-delete');

const Job = new Schema(
    {
        name: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
)

Job.plugin(mongoose_delete, {
    deletedAt: true
})

module.exports = mongoose.model('Job', Job)