const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {type: String, require: true},
    lastName: {type: String, require: true},
    email: {type: String, require: true, unique: true}
})

const UserModel = mongoose.model("User", UserSchema)

module.exports = UserModel;