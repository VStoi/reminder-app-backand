const Joi = require("@hapi/joi");

const registerSchema = Joi.object({
    firstName: Joi.string()
        .min(2)
        .max(20)
        .required(),
    lastName: Joi.string()
        .min(2)
        .max(20)
        .required(),
    email: Joi.string()
        .email()
        .required(),
    password: Joi.string()
        .min(6)
        .max(50)
        .required()
});

const loginSchema = Joi.object({
    email: Joi.string()
        .email()
        .required(),
    password: Joi.string()
        .min(6)
        .max(50)
        .required()
});

const deviceIdSchema = Joi.object({
    deviceToken: Joi.string()
        .required()
        .min(150)
        .max(200)
})



const validateRegistration = (data) => {
    return registerSchema.validate(data)
};
const validateLogin = (data) => {
    return loginSchema.validate(data)
};

const validateDeviceId = (data) => {
    return deviceIdSchema.validate(data)
};

module.exports.validateRegistration = validateRegistration;
module.exports.validateLogin = validateLogin;
module.exports.validateDeviceId = validateDeviceId;
