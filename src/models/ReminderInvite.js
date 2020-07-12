const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReminderInviteSchema = new Schema({
    reminderId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Reminder'},
    userId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
    isAccepted: {type: Boolean, required: true}
})

const ReminderInvite = mongoose.model("ReminderInvite", ReminderInviteSchema)

module.exports = ReminderInvite;