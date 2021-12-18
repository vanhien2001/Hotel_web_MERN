const Joi = require('joi');

const schema = Joi.object({
    name: Joi.string().required(),
})


const typeRoomValidator = (data) => {
    return schema.validate(data)
}


module.exports = typeRoomValidator

// try {
//     const value = schema.validate({
//     })
//     console.log(value.error.details[0].message)
// }
// catch (err) { }