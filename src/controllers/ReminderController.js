const Reminder = require("../models/Remider");
const User = require("../models/User");
const ReminderInvite = require("../models/ReminderInvite");

const {
    validateReminder,
    validateDeleteReminder,
    validateInviteReminder
    } = require("../utils/validations/ReminderValidation");


class ReminderController{

    create(req, res){
        const {error} = validateReminder(req.body)
        if (error){
            return res.status(400).json({error: error.details[0].message})
        }
        const userId = req.user._id
        const postData = {
            text: req.body.text,
            description: req.body.description,
            author: userId,
            remindAt: req.body.remindAt
        }

        const reminder = Reminder(postData)
        reminder.save()
            .then(obj => {
                return res.status(201).json({
                    id: obj._id,
                    text: req.body.text,
                    description: req.body.description,
                    remindAt: req.body.remindAt
                })
            })
            .catch(err => res.json({err}))
    }

    async get(req, res){
        const userId = req.user._id
        const remindersList = await Reminder.find({author: userId})
        return res.json(remindersList)
    }

    async delete(req, res){
        const {error} = validateDeleteReminder(req.body)
        if (error){
            return res.status(400).json({error: error.details[0].message})
        }
        const userId = req.user._id
        const deletedReminder = await Reminder.findById(req.body._id)
        if (!deletedReminder || deletedReminder.author !== userId){
            return res.status(404).json({
                error: "Reminder is not found"
            })
        }
        const toDeleteReminder = await Reminder.findOneAndDelete().and([{_id: req.body._id}, {author: userId}])
        return res.json(toDeleteReminder)
    }

    async invite(req, res){
        const {error} = validateInviteReminder(req.body)
        if (error){
            return res.status(400).json({error: error.details[0].message})
        }
        const userId = req.user._id
        try{
            const reminder = await Reminder.findOne().and([{_id: req.body.reminderId}, {author: userId}])
            const reminderInviteExist = await ReminderInvite.findOne().and([
                {reminderId: req.body.reminderId},
                {userId: req.body.userId}
            ])
            if (reminderInviteExist){
                return res.status(403).json({error: "Reminder invite already exist"})
            }
            const remindablePerson = await User.findById(req.body.userId)
            if (!remindablePerson){
                return res.status(404).json({error: "User is not found"})
            }
            try {
                const reminderInvite = await ReminderInvite({
                    reminderId: reminder._id,
                    userId: req.body.userId,
                    isAccepted: false
                })
                const savedReminderInvite = await reminderInvite.save()
                return res.status(201).json({
                    savedReminderInvite
                })
            }catch(e){
                res.json({error: e})
            }
        }catch (error) {
            return res.status(404).json({error: "Reminder is not found"})
        }
    }

    async getInvitedReminders(req, res){
        const userId = req.user._id
        const invitedRemindersFullModel = await ReminderInvite.find({userId}).populate({
            path: "reminderId",
            populate: {
                path: "author"
            }
        })
        const invitedReminders = invitedRemindersFullModel.map((obj) => {
            return {
                _id: obj._id,
                reminder: obj.reminderId,
                isAccepted: obj.isAccepted
            }
        })
        return res.json(invitedReminders);
    }

}

module.exports = ReminderController;
