const ReminderController = require("./../controllers/ReminderController");
const verifyToken = require("../middlewares/verifyToken");

const reminderRouter = (app) => {
    const Reminder = new ReminderController();

    app.post("/reminder/invite", verifyToken,  Reminder.invite);
    app.get("/reminder/invite", verifyToken,  Reminder.getInvitedReminders);
    app.post("/reminder", verifyToken,  Reminder.create);
    app.get("/reminder", verifyToken,  Reminder.get);
    app.delete("/reminder", verifyToken,  Reminder.delete);

};

module.exports = reminderRouter;