const ReminderController = require('./../controllers/ReminderController')
const verifyToken = require('../middlewares/verifyToken')

const reminderRouter = (app) => {
    const Reminder = new ReminderController();

    app.post('/reminder', verifyToken,  Reminder.create)
    app.get('/reminder', verifyToken,  Reminder.get)
    app.delete('/reminder', verifyToken,  Reminder.delete)
    app.post('/reminder/invite', verifyToken,  Reminder.invite)

};

module.exports = reminderRouter;