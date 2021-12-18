const Joi = require('joi');

const schema = Joi.object({
    name: Joi.string().required(),
    typeRoom: Joi.string(),
    images: Joi.array(),
    description: Joi.string(),
    size: Joi.number().required(),
    bed: Joi.number().required(),
    price: Joi.number().required(),
    services: Joi.array()
})


const roomValidator = (data) => {
    return schema.validate(data)
}


module.exports = roomValidator