const Joi = require('joi');

const schema = Joi.object({
    position: Joi.string().required(),
    salary: Joi.number().required()
})


const staffValidator = (data) => {
    return schema.validate(data)
}


module.exports = staffValidator