const Joi = require('joi');

const registeSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    address: Joi.string(),
    cmnd: Joi.string().length(12).required(),
    phone: Joi.string().length(10).required(),
    gender: Joi.string().required(),
    email: Joi.string().email({tlds: { allow: ['com', 'net'] }}).required(),
})

const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
})

const registerValidator = (data) => {
    return registeSchema.validate(data)
}

const loginValidator = (data) => {
    return loginSchema.validate(data)
}

module.exports = { registerValidator, loginValidator } 

// try {
//     const value = registeSchema.validate({
//         username: 'nvh',
//         password:'123',
//         firstname: 'nvh',
//         lastname: 'nvh',
//         email: 'nasg@gmail.com',
//         cmnd: '123456789123',
//         phone: '1234567891',
//         gender: 'male',
//         lala: 'test'
//     })
//     console.log(value.error.details[0].message)
// }
// catch (err) { }