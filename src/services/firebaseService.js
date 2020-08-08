const admin = require("firebase-admin");

const serviceAccount = require("../../firebaseAdminConfig.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://reminder-app-e7336.firebaseio.com"
});

const sendCloudMessage = (data, deviceToken) => {
    const message = {
        // Data is an object with title and text keys
        data: data,
        token: deviceToken
    };
    return admin.messaging().send(message);
};
