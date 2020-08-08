const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {type: String, require: true},
    lastName: {type: String, require: true},
    email: {type: String, require: true, unique: true},
    password: {type: String, required: true},
    deviceToken: {type: String, required: false, unique: true}
})

const User = mongoose.model("User", UserSchema)

module.exports = User;