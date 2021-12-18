const Joi = require('joi');

const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string(),
    icon: Joi.string(),
    extraService: Joi.boolean().required(),
    price: Joi.number().required()
})


const serviceValidator = (data) => {
    return schema.validate(data)
}


module.exports = serviceValidator