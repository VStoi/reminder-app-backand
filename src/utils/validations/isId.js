const Joi = require("@hapi/joi");


const idSchema = Joi.string()
        .length(24)
        .required();


const validateId = (data) => {
    return idSchema.validate(data);
};

module.exports.validateId = validateId;