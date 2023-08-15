const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:  String,
    position: String,
    email: String,
    password: String
},{timestamps : true});

const User = new mongoose.model("User",userSchema);

module.exports = User;
