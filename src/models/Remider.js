const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReminderSchema = new Schema({
    text: {type: String, require: true},
    description: {type: String},
    remindAt: {type: Date}
})

const ReminderModel = mongoose.model("Reminder", ReminderSchema)

module.exports = ReminderModel;