const mongoose = require("mongoose");

const chatModel = new mongoose.Schema({
    chatName : {type : String,trim:true},
    isGroupChat: {type : Boolean, default : false},
    mentee :{type: mongoose.Schema.Types.ObjectId,ref:"User",},
    mentor :{type: mongoose.Schema.Types.ObjectId,ref:"User",default: "64d7eea77706841111bb7b98"},
    // users: [
    //     {type: mongoose.Schema.Types.ObjectId,
    //      ref:"User",
    //     },],
    latestMessage:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Message"
    },
    groupAdmin:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
},{timestamps : true});

const Chat = new mongoose.model("Chat",chatModel);

module.exports = Chat;
