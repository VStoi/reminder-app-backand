const ReminderController = require("./../controllers/ReminderController");
const verifyToken = require("../middlewares/verifyToken");

const reminderRouter = (app) => {
    const Reminder = new ReminderController();

    app.put("/reminder/:_id/", verifyToken,  Reminder.edit);

    app.patch("/reminder/invite/:_id/accept", verifyToken,  Reminder.acceptReminder);
    app.patch("/reminder/invite/:_id/decline", verifyToken,  Reminder.declineReminder);
    app.post("/reminder/invite", verifyToken,  Reminder.invite);
    app.get("/reminder/invite", verifyToken,  Reminder.getInvitedReminders);
    app.post("/reminder", verifyToken,  Reminder.create);
    app.get("/reminder", verifyToken,  Reminder.get);
    app.delete("/reminder", verifyToken,  Reminder.delete);

};

module.exports = reminderRouter;