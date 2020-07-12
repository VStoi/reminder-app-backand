const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReminderSchema = new Schema({
    text: {type: String, required: true},
    description: {type: String},
    author: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
    remindAt: {type: Date}
})

const Reminder = mongoose.model("Reminder", ReminderSchema)

module.exports = Reminder;