const Joi = require('@hapi/joi')

const reminderSchema = Joi.object({
    text: Joi.string()
        .min(2)
        .max(30)
        .required(),
    description: Joi.string()
        .min(2)
        .max(100),
    remindAt: Joi.date()
})

const deleteReminderSchema = Joi.object({
    _id: Joi.string()
        .required()
})

const inviteReminderSchema = Joi.object({
    reminderId: Joi.string()
        .length(24)
        .required(),
    userId: Joi.string()
        .length(24)
        .required()
})

const validateReminder = (data) => {
    return reminderSchema.validate(data)
}
const validateDeleteReminder = (data) => {
    return deleteReminderSchema.validate(data)
}
const validateInviteReminder = (data) => {
    return inviteReminderSchema.validate(data)
}

module.exports.validateReminder = validateReminder;
module.exports.validateDeleteReminder = validateDeleteReminder;
module.exports.validateInviteReminder = validateInviteReminder;